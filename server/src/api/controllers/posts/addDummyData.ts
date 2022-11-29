import { Request } from 'express';
import prisma from '../../../lib/prisma';
import { APIJson } from '../../../lib/types/types';

export const addDummyData = async (req: Request, res: APIJson) => {
    const userId = req?.user?.id;
    const posts = [
        {
            title: 'Tailwind CSS Recipe app',
            description: 'a simple Recipe app made using Tailwind CSS',
            category: 'buttons',
            library: 'bulma',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Black Friday Deal Banner',
            description: 'Black Friday Deal Banner made using Bul ma CSS',
            category: 'buttons',
            library: 'bulma',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Tailwind CSS tasks lisT',
            description:
                'Simple, minimalist tasks list made using Tailwind CSS',
            category: 'buttons',
            library: 'bulma',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Tailwind CSS Responsive Form',
            description: 'Menu tailwind with apinejs and Tailwind CSS',
            category: 'grids',
            library: 'bulma',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'SAAS Landing Page #2',
            description:
                'SAAS Landing Page build with merakiui.com/ Components',
            category: 'buttons',
            library: 'bulma',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Tailwind CSS tasks lisT',
            description:
                'Simple, minimalist tasks list made using Tailwind CSS',
            category: 'grids',
            library: 'tailwindcss',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Tailwind CSS Menu Drop Down',
            description: 'Menu tailwind with apinejs and Tailwind CSS',
            category: 'grids',
            library: 'tailwindcss',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
        {
            title: 'Black Friday Deal Banner',
            description: 'Black Friday Deal Banner made using Tailwind CSS',
            category: 'buttons',
            library: 'tailwindcss',
            theme: 'light',
            code: 'any',
            responsive: false,
            animated: false,
        },
    ];

    try {
        const added = posts.map(async (x) => {
            await prisma.post.create({
                data: {
                    author: {
                        connect: {
                            id: userId,
                        },
                    },
                    categoryRelations: {
                        connect: {
                            value: x.category,
                        },
                    },
                    libraryRelations: {
                        connect: {
                            value: x.library,
                        },
                    },
                    ...(({ library, category, ...o }) => o)(x),
                },
            });
        });
        if (added) {
            res.json({ message: 'Added' });
        } else {
            res.status(400).json({ error: 'somethign happened' });
        }
    } catch (error: any) {
        console.log(error.message);

        res.status(400).json({
            error: error.message,
        });
    }
};
