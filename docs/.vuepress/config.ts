import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
    base: '/blog-vuepress/',
    lang: `zh-CN`,
    title: 'dsapr',
    description: '是 dsapr 的博客呢 ☺',
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '/images/logo.png',
        repo: 'git@github.com:dsapr/blog-vuepress.git',
        repoLabel: '博客仓库',
        contributors: true,
        navbar: [
            {
                text: '概览',
                link: '/overview/'
            },
            {
                text: 'Java',
                link: '/java/'
            },
            {
                text: 'SQL',
                link: '/sql/'
            },
            {
                text: '哲学',
                link: '/philosophy/'
            },
            {
                text: '站点',
                children: [
                    {
                        text: 'Github',
                        link: 'https://github.com/dsapr'
                    },
                    {
                        text: 'Gitee',
                        link: 'https://gitee.com/dsapr'
                    },
                ]
            }
        ]
    }
})
