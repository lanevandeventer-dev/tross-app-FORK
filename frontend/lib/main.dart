import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const TrossApp());
}

class TrossApp extends StatelessWidget {
  const TrossApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TrossApp',
      debugShowCheckedModeBanner: false, // Professional look
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFCD7F32), // Bronze
          primary: const Color(0xFFCD7F32), // Bronze
          secondary: const Color(0xFFFFB90F), // Honey Yellow
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          elevation: 2,
          shadowColor: Colors.black26,
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            elevation: 3,
            shadowColor: Colors.black26,
          ),
        ),
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _message = 'Click button to test backend connection';
  bool _isLoading = false;
  int _connectionAttempts = 0;

  Future<void> _testConnection() async {
    setState(() {
      _isLoading = true;
      _connectionAttempts++;
    });

    try {
      final stopwatch = Stopwatch()..start();
      final response = await http
          .get(
            Uri.parse('http://localhost:3001/api/hello'),
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'TrossApp-Flutter/1.0.0',
            },
          )
          .timeout(const Duration(seconds: 5));

      stopwatch.stop();

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final responseTime = stopwatch.elapsedMilliseconds;

        setState(() {
          _message =
              '✅ ${data['message'] ?? 'Hello from backend!'}\n'
              '⚡ Response time: ${responseTime}ms\n'
              '🔄 Attempt: $_connectionAttempts';
          _isLoading = false;
        });
      } else {
        setState(() {
          _message =
              '❌ Error: HTTP ${response.statusCode}\n'
              'Server returned an error';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        if (e.toString().contains('TimeoutException')) {
          _message =
              '⏱️ Timeout: Backend not responding\n'
              '💡 Is server running on port 3001?';
        } else if (e.toString().contains('SocketException')) {
          _message =
              '🌐 Connection failed: Network error\n'
              '💡 Check if backend server is running';
        } else {
          _message = '❌ Connection failed:\n${e.toString().split('\n').first}';
        }
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final isSmallScreen = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: AppBar(
        title: const Text('TrossApp Demo'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(isSmallScreen ? 16.0 : 32.0),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 600),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: isSmallScreen ? 16 : 32),
                  Hero(
                    tag: 'app-icon',
                    child: Icon(
                      Icons.build_circle,
                      size: isSmallScreen ? 48 : 64,
                      color: const Color(0xFFCD7F32), // Bronze
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'TrossApp',
                    style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                      color: const Color(0xFF8B4513), // Walnut
                      fontWeight: FontWeight.bold,
                      fontSize: isSmallScreen ? 28 : 32,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Flutter ↔ Node.js Connection Demo',
                    style: TextStyle(
                      fontSize: isSmallScreen ? 14 : 16,
                      color: const Color(0xFF8B4513), // Walnut
                      fontWeight: FontWeight.w500,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  Card(
                    elevation: 3,
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
                        color: const Color(
                          0xFFFFB90F,
                        ).withOpacity(0.1), // Light Honey Yellow
                      ),
                      child: _isLoading
                          ? Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const CircularProgressIndicator(
                                  color: Color(0xFFCD7F32),
                                  strokeWidth: 3,
                                ),
                                const SizedBox(height: 16),
                                Text(
                                  'Connecting to backend...',
                                  style: TextStyle(
                                    color: Colors.grey[700],
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ],
                            )
                          : Text(
                              _message,
                              textAlign: TextAlign.center,
                              style: const TextStyle(fontSize: 16, height: 1.4),
                            ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: _isLoading ? null : _testConnection,
                      icon: _isLoading
                          ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Colors.white,
                              ),
                            )
                          : const Icon(Icons.wifi_tethering),
                      label: Text(
                        _isLoading ? 'Testing...' : 'Test Backend Connection',
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFCD7F32), // Bronze
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 32,
                          vertical: 16,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: isSmallScreen ? 16 : 32),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
