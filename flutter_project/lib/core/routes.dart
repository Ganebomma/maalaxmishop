import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../customer/screens/home_screen.dart';
import '../customer/screens/phone_catalog_screen.dart';
import '../customer/screens/emi_calculator_screen.dart';
import '../customer/screens/repair_enquiry_screen.dart';
import '../customer/screens/otp_login_screen.dart';
import '../customer/screens/my_account_screen.dart';
import '../admin/screens/admin_login_screen.dart';
import '../admin/screens/admin_dashboard_screen.dart';
import '../admin/screens/pos_billing_screen.dart';

class AppRoutes {
  static final router = GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final path = state.uri.toString();
      final isAdmin = path.startsWith('/admin');
      final isAccount = path.startsWith('/my-');
      final currentUser = FirebaseAuth.instance.currentUser;

      // Customer account guard
      if (isAccount && currentUser == null) {
        return '/login';
      }

      // Admin route guard
      if (isAdmin && path != '/admin/login') {
        if (currentUser == null) {
          return '/admin/login';
        }
      }
      return null;
    },
    routes: [
      // 1. PUBLIC CUSTOMER WEBSITE ROUTES (Zero admin options)
      GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
      GoRoute(path: '/phones', builder: (context, state) => const PhoneCatalogScreen()),
      GoRoute(path: '/emi-calculator', builder: (context, state) => const EmiCalculatorScreen()),
      GoRoute(path: '/repair-enquiry', builder: (context, state) => const RepairEnquiryScreen()),
      GoRoute(path: '/login', builder: (context, state) => const OtpLoginScreen()),
      GoRoute(path: '/my-account', builder: (context, state) => const MyAccountScreen()),

      // 2. PRIVATE ADMIN PANEL (Direct access only)
      GoRoute(path: '/admin/login', builder: (context, state) => const AdminLoginScreen()),
      GoRoute(path: '/admin/dashboard', builder: (context, state) => const AdminDashboardScreen()),
      GoRoute(path: '/admin/billing', builder: (context, state) => const PosBillingScreen()),
    ],
  );
}
