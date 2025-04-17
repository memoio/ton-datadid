// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        url: "https://datadid-project.vercel.app",
        name: "TON Vote",
        iconUrl: "https://datadid-project.vercel.app/矢量智能对象 1 1.png"
    });
}