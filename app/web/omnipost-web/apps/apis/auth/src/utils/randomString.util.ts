import crypto from 'crypto'

const randomStringgenerate = () => {
    const random = crypto.randomBytes(32).toString('hex')
    return random
}

export default randomStringgenerate