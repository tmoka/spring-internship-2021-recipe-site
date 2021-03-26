const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})

module.exports = {
    images: {
      domains: ['img.cpcdn.com', 'staff-recipes-images-prod.s3.ap-northeast-1.amazonaws.com'],
    },
}