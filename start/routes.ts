import CartController from '#controllers/carts_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')

// ---> UBAH BARIS INI <---
// router.on('/').render('pages/index')

// ---> MENJADI SEPERTI INI <---
router.get('/', async ({ view, auth, session }) => {
  console.log('--- Memuat Halaman Utama ---')
  console.log('Apakah user terautentikasi?', auth.isAuthenticated)
  console.log('Isi Sesi:', session.all())
  return view.render('pages/index')
})


router.on('/products').render('pages/products')
router.on('/contact').render('pages/contact')

router.get('/register', [AuthController, 'showRegister'])
router.post('/register', [AuthController, 'storeRegister'])
router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'storeLogin'])
router.post('/logout', [AuthController, 'logout'])

router.get('/cart', [CartController, 'index']).use(middleware.auth()) // Hanya user login
router.post('/cart', [CartController, 'store']).use(middleware.auth()) // Hanya user login