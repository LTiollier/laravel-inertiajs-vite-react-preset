import React from 'react'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { render } from 'react-dom'
import BaseLayout from './layouts/BaseLayout'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

createInertiaApp({
    resolve: async (name) => {
        const module = await import(`./pages/${name}.jsx`)
        const page = module.default;
        page.layout ??= (page) => <BaseLayout>{page}</BaseLayout>
        return page
    },
    setup({el, App, props}) {
        render(<App {...props} />, el)
    },
})

