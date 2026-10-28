import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  void _callStore() async {
    final uri = Uri.parse('tel:+919913102050');
    if (await canLaunchUrl(uri)) await launchUrl(uri);
  }

  void _openWhatsApp() async {
    final uri = Uri.parse('https://wa.me/919913102050?text=Namaste%20Maa%20Lakshmi%20Mobile');
    if (await canLaunchUrl(uri)) await launchUrl(uri);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Maa Lakshmi Mobile And Electronics',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
            ),
            Text(
              'Shop No. 35, Keshav Nagar, Godadara Road, Surat',
              style: TextStyle(fontSize: 10, color: Colors.grey),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.phone, color: Color(0xFFF59E0B)),
            onPressed: _callStore,
            tooltip: 'Call Store',
          ),
          IconButton(
            icon: const Icon(Icons.chat, color: Color(0xFF10B981)),
            onPressed: _openWhatsApp,
            tooltip: 'WhatsApp Store',
          ),
          IconButton(
            icon: const Icon(Icons.account_circle),
            onPressed: () => context.go('/my-account'),
            tooltip: 'My Account',
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFFE11D48),
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          if (index == 0) context.go('/');
          if (index == 1) context.go('/phones');
          if (index == 2) context.go('/emi-calculator');
          if (index == 3) context.go('/repair-enquiry');
          if (index == 4) context.go('/my-account');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.phone_android), label: 'Phones'),
          BottomNavigationBarItem(icon: Icon(Icons.calculate), label: '0% EMI'),
          BottomNavigationBarItem(icon: Icon(Icons.build), label: 'Repairs'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Account'),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Festive 0% EMI Hero Banner
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFFE11D48), Color(0xFFD97706)],
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Text(
                      'SURAT SPECIAL SCHEMES',
                      style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Zero Down Payment &\n0% EMI On Latest 5G Phones',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 26,
                      fontWeight: FontWeight.w900,
                      height: 1.2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Bajaj Finserv & IDFC FIRST Bank on-spot finance approval at Keshav Nagar, Surat.',
                    style: TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFFE11D48),
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: () => context.go('/phones'),
                    child: const Text('Browse 5G Smartphones', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
