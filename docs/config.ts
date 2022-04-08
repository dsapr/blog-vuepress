import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    base: '/blog-vuepress/',
    lang: `zh-CN`,
    title: 'dsapr blog',
    description: 'dsapr blog',
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '/images/logo.png'
    }
})
