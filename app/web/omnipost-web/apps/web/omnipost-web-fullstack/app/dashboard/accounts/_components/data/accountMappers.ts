import type { Account } from "./mockData"

/**
 * Maps the Prisma `SocialMedia` enum value → the display platform name
 * used by the UI's `Account["platform"]` union type.
 */
const PROVIDER_DISPLAY_MAP: Record<string, Account["platform"]> = {
    instagram: "Instagram",
    facebook: "Facebook",
    x: "Twitter/X",
    linkedin: "LinkedIn",
}

/**
 * Maps the Prisma `SocialMedia` enum value → a username prefix/format
 * used for display purposes.
 */
const USERNAME_PREFIX_MAP: Record<string, string> = {
    instagram: "@",
    facebook: "fb/",
    x: "@",
    linkedin: "in/",
}

/**
 * Shape of a raw account row from the Prisma `Accounts` model.
 * Kept lightweight — we only declare the fields we actually use so the
 * mapper stays decoupled from the full generated Prisma type.
 */
export interface DbAccount {
    id: string
    userID: string
    provider: string          // SocialMedia enum value
    providerAccountId: string
    accessToken: string
    refreshToken: string | null
    expiresAt: Date | string  // Could be Date from Prisma or string after JSON serialization
    createdDat: Date | string
    updatedAt: Date | string | null
}

/**
 * Converts a raw Prisma `Accounts` row into the UI `Account` shape
 * expected by `ConnectedAccountsList` and the rest of the accounts dashboard.
 *
 * Fields that aren't stored in the DB (avatar, followers, permissions, sync logs)
 * are filled with sensible defaults.
 */
export function mapDbAccountToUiAccount(dbAccount: DbAccount): Account {
    const now = new Date()
    const expiresAt = new Date(dbAccount.expiresAt)
    const createdAt = new Date(dbAccount.createdDat)

    const isExpired = expiresAt <= now
    const daysRemaining = Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

    // Determine connection & health status based on token expiry
    const connectedStatus: Account["connectedStatus"] = isExpired ? "disconnected" : "connected"
    let healthStatus: Account["healthStatus"] = "excellent"
    if (isExpired) {
        healthStatus = "error"
    } else if (daysRemaining <= 7) {
        healthStatus = "warning"
    } else if (daysRemaining <= 30) {
        healthStatus = "good"
    }

    const platform = PROVIDER_DISPLAY_MAP[dbAccount.provider] ?? "Instagram"
    const usernamePrefix = USERNAME_PREFIX_MAP[dbAccount.provider] ?? "@"

    // Use DiceBear for a deterministic avatar based on the account ID
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(dbAccount.providerAccountId)}&backgroundColor=b6e3f4`

    // Compute token expiry display string
    const tokenExpiry = isExpired
        ? "Expired (needs reauth)"
        : `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`

    // Format "connected since" date
    const connectedSince = createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    // Compute last sync display (use updatedAt if available, otherwise createdAt)
    const lastSyncDate = dbAccount.updatedAt ? new Date(dbAccount.updatedAt) : createdAt
    const lastSync = formatRelativeTime(lastSyncDate, now)

    return {
        id: dbAccount.id,
        platform,
        name: dbAccount.providerAccountId || `${platform} Account`,
        username: `${usernamePrefix}${dbAccount.providerAccountId}`,
        avatarUrl,
        verified: false,
        followerCount: "—",
        connectedStatus,
        healthStatus,
        lastSync,
        apiVersion: getApiVersion(dbAccount.provider),
        permissionsSummary: getPermissionsSummary(dbAccount.provider),
        businessType: "Personal",
        connectedSince,
        tokenExpiry,
        webhookStatus: isExpired ? "inactive" : "active",
        syncLogs: [],
        grantedPermissions: getDefaultPermissions(connectedStatus === "connected"),
    }
}

/**
 * Formats a date as a human-readable relative time string.
 */
function formatRelativeTime(date: Date, now: Date): string {
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function getApiVersion(provider: string): string {
    switch (provider) {
        case "instagram": return "v19.0 (Graph)"
        case "facebook":  return "v19.0 (Graph)"
        case "x":         return "v2.1 (OAuth2)"
        case "linkedin":  return "v2.0 (OAuth2)"
        default:          return "v1.0"
    }
}

function getPermissionsSummary(provider: string): string {
    switch (provider) {
        case "instagram": return "Publish feeds, stories, analytics read access"
        case "facebook":  return "Manage pages, read stats, publish updates"
        case "x":         return "Post tweets, read account timeline, media upload"
        case "linkedin":  return "Publish updates, retrieve organizational details"
        default:          return "Basic read and publish access"
    }
}

function getDefaultPermissions(isConnected: boolean): Account["grantedPermissions"] {
    return [
        { name: "Publish Posts",    granted: isConnected, required: true },
        { name: "Upload Images",    granted: isConnected, required: true },
        { name: "Upload Videos",    granted: isConnected, required: true },
        { name: "Read Analytics",   granted: isConnected, required: true },
        { name: "Manage Comments",  granted: false,       required: false },
        { name: "Read Profile Info", granted: isConnected, required: true },
    ]
}
