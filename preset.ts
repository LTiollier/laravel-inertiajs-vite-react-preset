export default definePreset({
	name: 'inertia-preset',
	options: {},
	handler: async(context) => {
		await deletePaths({
			title: 'Remove Mix files',
			paths: ['webpack.mix.js', 'resources/js']
		})

		await installPackages({
			title: 'Install React, Vite, and Inertia packages',
			for: 'node',
			install: [
				'react', 'react-dom',
				'vite', 'vite-plugin-laravel', '@vitejs/plugin-react-refresh',
				'@inertiajs/inertia', '@inertiajs/inertia-react', '@inertiajs/progress'
			],
			dev: true,
		})

		await editFiles({
			title: 'Update package.json',
			files: 'package.json',
			operations: [
				{ type: 'edit-json', delete: ['scripts'] },
				{ type: 'edit-json', merge: { scripts: { 'dev': 'vite', 'prod': 'vite build' } },
			}],
		})

		await extractTemplates({
			title: 'Add vite.config.ts',
			from: 'vite'
		})

		await extractTemplates({
			title: 'Add resources bases files',
			from: 'inertia',
		})

		await installPackages({
			title: 'Install laravel-vite and inertia-laravel',
			for: 'php',
			install: [
				'innocenzi/laravel-vite',
				'inertiajs/inertia-laravel'
			],
		})

		await executeCommand({
			title: 'Setup inertia middleware',
			command: 'php',
			arguments: ['artisan', 'inertia:middleware'],
			ignoreExitCode: true,
		})

		await editFiles({
			title: 'Add inertia middleware to Kernel',
			files: 'app/Http/Kernel.php',
			operations: [
				{
					type: 'add-line',
					lines: [
						'\\App\\Http\\Middleware\\HandleInertiaRequests::class,'
					],
					position: 'after',
				},
			],
		})
	},
})
