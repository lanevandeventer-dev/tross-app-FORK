import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:tross_app/main.dart';

void main() {
  testWidgets('TrossApp loads without crashing', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const TrossApp());

    // Verify that our app loads the basic elements
    expect(find.text('TrossApp'), findsOneWidget);
    expect(find.text('Test Backend'), findsOneWidget);
    
    // Verify the app doesn't crash
    expect(tester.takeException(), isNull);
  });
}
