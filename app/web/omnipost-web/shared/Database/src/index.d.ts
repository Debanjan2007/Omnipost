import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/prisma/client.js";
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../prisma/generated/prisma/runtime/client.js").DefaultArgs>;
export { prisma };
//# sourceMappingURL=index.d.ts.map