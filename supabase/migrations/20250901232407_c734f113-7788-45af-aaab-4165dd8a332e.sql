-- Add English fields to FAQs table
ALTER TABLE public.faqs 
ADD COLUMN question_en TEXT,
ADD COLUMN answer_en TEXT;

-- Add English fields to Gallery table  
ALTER TABLE public.gallery
ADD COLUMN title_en TEXT,
ADD COLUMN description_en TEXT;

-- Add English fields to Products table
ALTER TABLE public.products
ADD COLUMN name_en TEXT, 
ADD COLUMN description_en TEXT;

-- Add English fields to Features table
ALTER TABLE public.features
ADD COLUMN title_en TEXT,
ADD COLUMN description_en TEXT;

-- Add English fields to Offers table
ALTER TABLE public.offers
ADD COLUMN title_en TEXT,
ADD COLUMN description_en TEXT;

-- Update existing data with English translations
UPDATE public.faqs SET 
question_en = CASE 
  WHEN question = 'هل منتجاتكم طبيعية 100%؟' THEN 'Are your products 100% natural?'
  WHEN question = 'كم مدة صلاحية المنتجات؟' THEN 'What is the shelf life of the products?'
  WHEN question = 'هل يمكن استخدام المنتجات للبشرة الحساسة؟' THEN 'Can products be used for sensitive skin?'
  ELSE 'Frequently Asked Question'
END,
answer_en = CASE 
  WHEN answer = 'نعم، جميع منتجاتنا مصنوعة من مكونات طبيعية بالكامل دون إضافة أي مواد كيميائية ضارة' THEN 'Yes, all our products are made from 100% natural ingredients without any harmful chemicals'
  WHEN answer = 'تتراوح مدة صلاحية منتجاتنا من 12 إلى 18 شهر من تاريخ الإنتاج عند الحفظ في مكان بارد وجاف' THEN 'Our products have a shelf life of 12 to 18 months from production date when stored in a cool, dry place'
  WHEN answer = 'نعم، منتجاتنا مناسبة لجميع أنواع البشرة بما فيها البشرة الحساسة لأنها طبيعية 100%' THEN 'Yes, our products are suitable for all skin types including sensitive skin as they are 100% natural'
  ELSE 'Answer to frequently asked question'
END;

UPDATE public.gallery SET
title_en = CASE
  WHEN title = 'مجموعة الصابون الطبيعي' THEN 'Natural Soap Collection'
  WHEN title = 'كريمات العناية الفاخرة' THEN 'Luxury Care Creams'
  WHEN title = 'زيوت طبيعية مميزة' THEN 'Premium Natural Oils'
  ELSE 'Gallery Item'
END,
description_en = CASE
  WHEN description = 'تشكيلة متنوعة من الصابون الطبيعي المصنوع يدوياً' THEN 'A diverse collection of handmade natural soap'
  WHEN description = 'كريمات طبيعية للعناية بالبشرة وترطيبها' THEN 'Natural creams for skin care and moisturizing'
  WHEN description = 'مجموعة من الزيوت الطبيعية للعناية والاسترخاء' THEN 'A collection of natural oils for care and relaxation'
  ELSE 'Gallery item description'
END;

UPDATE public.products SET
name_en = CASE
  WHEN name = 'صابون زيت الأرغان' THEN 'Argan Oil Soap'
  WHEN name = 'كريم الورد البلغاري' THEN 'Bulgarian Rose Cream'
  WHEN name = 'زيت اللافندر المهدئ' THEN 'Soothing Lavender Oil'
  ELSE 'Natural Product'
END,
description_en = CASE
  WHEN description = 'صابون طبيعي مصنوع من زيت الأرغان المغربي الأصلي، يرطب البشرة ويغذيها بعمق' THEN 'Natural soap made from authentic Moroccan argan oil, deeply moisturizes and nourishes the skin'
  WHEN description = 'كريم مرطب فاخر بماء الورد البلغاري الأصلي لنعومة ونضارة طبيعية' THEN 'Luxury moisturizing cream with authentic Bulgarian rose water for natural softness and radiance'
  WHEN description = 'زيت اللافندر الطبيعي للاسترخاء وتهدئة البشرة والأعصاب' THEN 'Natural lavender oil for relaxation and soothing skin and nerves'
  ELSE 'Natural personal care product'
END;

UPDATE public.features SET
title_en = CASE
  WHEN title = 'منتجات طبيعية 100%' THEN '100% Natural Products'
  WHEN title = 'شحن مجاني' THEN 'Free Shipping'
  WHEN title = 'ضمان الجودة' THEN 'Quality Guarantee'
  WHEN title = 'دعم على مدار الساعة' THEN '24/7 Support'
  ELSE 'Feature'
END,
description_en = CASE
  WHEN description = 'جميع منتجاتنا مصنوعة من مكونات طبيعية خالصة' THEN 'All our products are made from pure natural ingredients'
  WHEN description = 'شحن مجاني لجميع الطلبات داخل المملكة' THEN 'Free shipping for all orders within the Kingdom'
  WHEN description = 'ضمان استرداد المبلغ خلال 30 يوم' THEN '30-day money back guarantee'
  WHEN description = 'خدمة عملاء متاحة 24/7 لمساعدتك' THEN '24/7 customer service available to help you'
  ELSE 'Feature description'
END;

UPDATE public.offers SET
title_en = CASE
  WHEN title = 'خصم 25% على جميع المنتجات' THEN '25% Off All Products'
  WHEN title = 'اشتري 2 واحصل على الثالث مجاناً' THEN 'Buy 2 Get 1 Free'
  ELSE 'Special Offer'
END,
description_en = CASE
  WHEN description = 'عرض خاص لفترة محدودة على جميع منتجات العناية الطبيعية' THEN 'Limited time offer on all natural care products'
  WHEN description = 'عرض مميز على منتجات الصابون الطبيعي' THEN 'Special offer on natural soap products'
  ELSE 'Special offer description'
END;