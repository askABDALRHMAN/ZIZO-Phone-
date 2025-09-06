-- Insert sample admin user
INSERT INTO admin_users (username, password_hash) VALUES ('admin', 'admin123');

-- Insert sample products
INSERT INTO products (name, description, price, original_price, image_url, category, is_new, is_bestseller, is_organic, is_featured) VALUES
('صابون زيت الأرغان', 'صابون طبيعي مصنوع من زيت الأرغان المغربي الأصلي، يرطب البشرة ويغذيها بعمق', 45.00, 60.00, '/api/placeholder/300/300', 'soap', false, true, true, true),
('كريم الورد البلغاري', 'كريم مرطب فاخر بماء الورد البلغاري الأصلي لنعومة ونضارة طبيعية', 85.00, null, '/api/placeholder/300/300', 'cream', false, false, true, false),
('زيت اللافندر المهدئ', 'زيت اللافندر الطبيعي للاسترخاء وتهدئة البشرة والأعصاب', 65.00, null, '/api/placeholder/300/300', 'oil', true, false, true, false);

-- Insert sample reviews
INSERT INTO reviews (product_id, customer_name, rating, review_text) VALUES
((SELECT id FROM products WHERE name = 'صابون زيت الأرغان'), 'فاطمة أحمد', 5, 'منتجات رائعة وطبيعية 100%. لاحظت فرق كبير في بشرتي بعد الاستخدام'),
((SELECT id FROM products WHERE name = 'صابون زيت الأرغان'), 'محمد علي', 5, 'صابون الأرغان ممتاز، رائحته جميلة ويرطب البشرة بشكل رائع'),
((SELECT id FROM products WHERE name = 'كريم الورد البلغاري'), 'نور محمد', 4, 'كريم الورد البلغاري له ملمس حريري ورائحة طبيعية جميلة');

-- Insert sample comments
INSERT INTO comments (customer_name, comment_text, product_id) VALUES
('سارة محمد', 'أفضل صابون طبيعي جربته! بشرتي أصبحت أنعم بكثير', (SELECT id FROM products WHERE name = 'صابون زيت الأرغان'));

-- Insert sample FAQs
INSERT INTO faqs (question, answer, order_index, is_active) VALUES
('هل منتجاتكم طبيعية 100%؟', 'نعم، جميع منتجاتنا مصنوعة من مكونات طبيعية بالكامل دون إضافة أي مواد كيميائية ضارة', 1, true),
('كم مدة صلاحية المنتجات؟', 'تتراوح مدة صلاحية منتجاتنا من 12 إلى 18 شهر من تاريخ الإنتاج عند الحفظ في مكان بارد وجاف', 2, true),
('هل يمكن استخدام المنتجات للبشرة الحساسة؟', 'نعم، منتجاتنا مناسبة لجميع أنواع البشرة بما فيها البشرة الحساسة لأنها طبيعية 100%', 3, true);

-- Insert sample gallery items
INSERT INTO gallery (title, description, image_url, category) VALUES
('مجموعة الصابون الطبيعي', 'تشكيلة متنوعة من الصابون الطبيعي المصنوع يدوياً', '/api/placeholder/400/300', 'soap'),
('كريمات العناية الفاخرة', 'كريمات طبيعية للعناية بالبشرة وترطيبها', '/api/placeholder/400/300', 'cream'),
('زيوت طبيعية مميزة', 'مجموعة من الزيوت الطبيعية للعناية والاسترخاء', '/api/placeholder/400/300', 'oil');

-- Insert sample offers
INSERT INTO offers (title, description, discount_percentage, image_url, is_active, expires_at) VALUES
('خصم 25% على جميع المنتجات', 'عرض خاص لفترة محدودة على جميع منتجات العناية الطبيعية', 25, '/api/placeholder/400/200', true, NOW() + INTERVAL '30 days'),
('اشتري 2 واحصل على الثالث مجاناً', 'عرض مميز على منتجات الصابون الطبيعي', 33, '/api/placeholder/400/200', true, NOW() + INTERVAL '15 days');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, customer_image, comment, rating, is_approved) VALUES
('أميرة سالم', '/api/placeholder/60/60', 'منتجات رائعة وفعالة، أنصح بها بشدة!', 5, true),
('خالد أحمد', '/api/placeholder/60/60', 'أفضل منتجات طبيعية جربتها، نتائج مذهلة', 5, true),
('مريم عبدالله', '/api/placeholder/60/60', 'جودة عالية وأسعار مناسبة، سأكرر الشراء', 4, true);

-- Insert sample features
INSERT INTO features (title, description, icon_name) VALUES
('منتجات طبيعية 100%', 'جميع منتجاتنا مصنوعة من مكونات طبيعية خالصة', 'leaf'),
('شحن مجاني', 'شحن مجاني لجميع الطلبات داخل المملكة', 'truck'),
('ضمان الجودة', 'ضمان استرداد المبلغ خلال 30 يوم', 'shield-check'),
('دعم على مدار الساعة', 'خدمة عملاء متاحة 24/7 لمساعدتك', 'headphones');