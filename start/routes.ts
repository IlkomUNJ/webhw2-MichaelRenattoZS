// Halaman utama
import router from '@adonisjs/core/services/router'

// Pages
router.on('/').render('pages/index')
router.on('/games').render('pages/game')
router.on('/about').render('pages/about')

// API
router.get('/api/products', [() => import('../app/controllers/http/api_controller.js'), 'products'])
router.get('/api/wishlist', [() => import('../app/controllers/http/api_controller.js'), 'wishlist'])
router.post('/api/wishlist', [() => import('../app/controllers/http/api_controller.js'), 'addWishlist'])
router.delete('/api/wishlist/:id', [() => import('../app/controllers/http/api_controller.js'), 'removeWishlist'])
router.post('/api/contact', [() => import('../app/controllers/http/api_controller.js'), 'contact'])
