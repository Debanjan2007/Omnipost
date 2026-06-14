import randomStringgenerate from '../utils/randomString.util'

const truecallerAuthUrl = (suffix: 'signup' | 'login') => {
    const requestNouce = randomStringgenerate()
    const truecallerBaseUrl = process.env.TRUECALLER_SDK_URL
    const AuthParams = new URLSearchParams({
        type: 'btmsheet',
        requestNonce: requestNouce,
        partnerKey: process.env.TRUECALLER_PRIMARY_KEY as string,
        partnerName: 'OmniPost',
        lang: 'en',
        privacyUrl: process.env.TRUECALLER_PRIVACY_URL as string,
        termsUrl: process.env.TRUECALLER_TERS_URL as string,
        loginPrefix: suffix === 'signup' ? 'getstarted' : 'continue',
        loginSuffix: suffix,
        ctaPrefix: 'continuewith',
        // Match the OmniPost brand UI: primary purple (#8467D7) with white text.
        ctaColor: '#8467D7',
        ctaTextColor: '#FFFFFF',
        btnShape: 'round',
        skipOption: 'useanothernum',
        ttl: '60000',
    })
    return `${truecallerBaseUrl}?${AuthParams.toString()}`
}

export default truecallerAuthUrl