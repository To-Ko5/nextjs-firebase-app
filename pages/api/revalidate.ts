import { getAuth } from 'firebase-admin/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
type Data =
  | {
      revalidated: boolean
    }
  | string

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    // tokenチェック
    const token = req.headers.authorization?.split(' ')?.[1] as string
    getAuth().verifyIdToken(token)

    await res.revalidate(req.query.path as string)
    return res.json({ revalidated: true })
  } catch {
    return res.status(500).send('Error revalidating')
  }
}

export default handler
