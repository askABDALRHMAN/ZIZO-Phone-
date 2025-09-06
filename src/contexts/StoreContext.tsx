import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts, Product } from '@/hooks/useProducts';
import { useReviews, Review } from '@/hooks/useReviews';
import { useMessages, Message } from '@/hooks/useMessages';
import { useComments, Comment } from '@/hooks/useComments';
import { useFAQs, FAQ } from '@/hooks/useFAQs';
import { useGallery, GalleryItem } from '@/hooks/useGallery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CartItem extends Product {
  quantity: number;
}

// Re-export interfaces for backward compatibility
export type { Product, Review, Message, Comment, FAQ, GalleryItem };

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: any) => Promise<void>;
  updateProduct: (id: string, product: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  productsLoading: boolean;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Favorites
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  
  // Messages
  messages: Message[];
  addMessage: (message: any) => Promise<void>;
  markMessageAsRead: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  messagesLoading: boolean;
  
  // Reviews
  reviews: Review[];
  addReview: (review: any) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  reviewsLoading: boolean;
  
  // Comments
  comments: Comment[];
  addComment: (comment: any) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  commentsLoading: boolean;
  
  // FAQ
  faqs: FAQ[];
  addFAQ: (faq: any) => Promise<void>;
  updateFAQ: (id: string, faq: any) => Promise<void>;
  deleteFAQ: (id: string) => Promise<void>;
  faqsLoading: boolean;
  
  // Gallery
  galleryItems: GalleryItem[];
  addGalleryItem: (item: any) => Promise<void>;
  updateGalleryItem: (id: string, item: any) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  galleryLoading: boolean;
  
  // Admin
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use Supabase hooks
  const { 
    products: rawProducts, 
    loading: productsLoading, 
    addProduct: addProductToSupabase, 
    updateProduct: updateProductInSupabase, 
    deleteProduct: deleteProductFromSupabase 
  } = useProducts();
  
  const { 
    reviews: rawReviews, 
    loading: reviewsLoading, 
    addReview: addReviewToSupabase, 
    deleteReview: deleteReviewFromSupabase 
  } = useReviews();
  
  const { 
    messages: rawMessages, 
    loading: messagesLoading, 
    addMessage: addMessageToSupabase, 
    markAsRead: markMessageAsReadInSupabase, 
    deleteMessage: deleteMessageFromSupabase 
  } = useMessages();
  
  const { 
    comments: rawComments, 
    loading: commentsLoading, 
    addComment: addCommentToSupabase, 
    deleteComment: deleteCommentFromSupabase 
  } = useComments();
  
  const { 
    faqs: rawFaqs, 
    loading: faqsLoading, 
    addFAQ: addFAQToSupabase, 
    updateFAQ: updateFAQInSupabase, 
    deleteFAQ: deleteFAQFromSupabase 
  } = useFAQs();
  
  const { 
    galleryItems: rawGalleryItems, 
    loading: galleryLoading, 
    addGalleryItem: addGalleryItemToSupabase, 
    updateGalleryItem: updateGalleryItemInSupabase, 
    deleteGalleryItem: deleteGalleryItemFromSupabase 
  } = useGallery();

  // Local state for cart, favorites, and admin
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Transform Supabase data to include legacy properties
  const products: Product[] = rawProducts.map(product => ({
    ...product,
    // Legacy property mappings for backward compatibility
    nameEn: product.name || '',
    descriptionEn: product.description || '', 
    originalPrice: product.original_price,
    image: product.image_url || '/api/placeholder/300/300',
    ingredients: 'مكونات طبيعية عالية الجودة',
    ingredientsEn: 'High quality natural ingredients',
    badge: (product.is_new ? 'new' : product.is_bestseller ? 'bestseller' : product.is_organic ? 'organic' : undefined) as 'new' | 'bestseller' | 'organic' | undefined,
    inStock: true,
    messageCount: 0
  }));

  const reviews: Review[] = rawReviews.map(review => ({
    ...review,
    name: review.customer_name,
    comment: review.review_text || '',
    avatar: '/api/placeholder/60/60',
    productId: review.product_id,
    timestamp: new Date(review.created_at || Date.now())
  }));

  const messages: Message[] = rawMessages.map(message => ({
    ...message,
    productId: message.product_id,
    timestamp: new Date(message.created_at || Date.now()),
    read: message.is_read || false
  }));

  const comments: Comment[] = rawComments.map(comment => ({
    ...comment,
    name: comment.customer_name,
    comment: comment.comment_text,
    productId: comment.product_id,
    productImage: '/api/placeholder/300/300',
    productName: 'Product Name',
    isOfficial: comment.customer_name === 'موقع العناية الطبيعية',
    timestamp: new Date(comment.created_at || Date.now())
  }));

  const faqs: FAQ[] = rawFaqs.map(faq => ({
    ...faq,
    questionEn: faq.question,
    answerEn: faq.answer,
    order: faq.order_index || 0
  }));

  const galleryItems: GalleryItem[] = rawGalleryItems.map(item => ({
    ...item,
    titleEn: item.title || '',
    descriptionEn: item.description || '',
    image: item.image_url
  }));

  // Load cart and favorites from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Save cart and favorites to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Product management
  const addProduct = async (product: any) => {
    await addProductToSupabase({
      name: product.name,
      description: product.description,
      price: product.price,
      original_price: product.originalPrice || product.original_price,
      image_url: product.image || product.image_url,
      category: product.category,
      whatsapp_text: product.whatsapp_text,
      is_featured: product.is_featured,
      is_new: product.badge === 'new' || product.is_new,
      is_bestseller: product.badge === 'bestseller' || product.is_bestseller,
      is_organic: product.badge === 'organic' || product.is_organic || true
    });
  };

  const updateProduct = async (id: string, updates: any) => {
    const supabaseUpdates: Partial<Product> = {
      name: updates.name,
      description: updates.description,
      price: updates.price,
      original_price: updates.originalPrice || updates.original_price,
      image_url: updates.image || updates.image_url,
      category: updates.category,
      whatsapp_text: updates.whatsapp_text,
      is_featured: updates.is_featured,
      is_new: updates.badge === 'new' || updates.is_new,
      is_bestseller: updates.badge === 'bestseller' || updates.is_bestseller,
      is_organic: updates.badge === 'organic' || updates.is_organic
    };
    
    await updateProductInSupabase(id, supabaseUpdates);
  };

  const deleteProduct = async (id: string) => {
    await deleteProductFromSupabase(id);
    setCart(prev => prev.filter(item => item.id !== id));
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  // Cart management
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites management
  const addToFavorites = (productId: string) => {
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  // Messages management
  const addMessage = async (messageData: any) => {
    await addMessageToSupabase({
      name: messageData.name,
      email: messageData.email,
      phone: messageData.phone,
      message: messageData.message,
      product_id: messageData.productId || messageData.product_id
    });
  };

  const markMessageAsRead = async (messageId: string) => {
    await markMessageAsReadInSupabase(messageId);
  };

  const deleteMessage = async (messageId: string) => {
    await deleteMessageFromSupabase(messageId);
  };

  // Reviews management
  const addReview = async (reviewData: any) => {
    await addReviewToSupabase({
      product_id: reviewData.productId || reviewData.product_id || '',
      customer_name: reviewData.name || reviewData.customer_name || '',
      rating: reviewData.rating,
      review_text: reviewData.comment || reviewData.review_text || ''
    });
  };

  const deleteReview = async (reviewId: string) => {
    await deleteReviewFromSupabase(reviewId);
  };

  // Comments management
  const addComment = async (commentData: any) => {
    await addCommentToSupabase({
      customer_name: commentData.name || commentData.customer_name || '',
      comment_text: commentData.comment || commentData.comment_text || '',
      product_id: commentData.productId || commentData.product_id || ''
    });
  };

  const deleteComment = async (commentId: string) => {
    await deleteCommentFromSupabase(commentId);
  };

  // FAQ management
  const addFAQ = async (faqData: any) => {
    await addFAQToSupabase({
      question: faqData.question,
      answer: faqData.answer,
      order_index: faqData.order || faqData.order_index || 0
    });
  };

  const updateFAQ = async (id: string, updates: any) => {
    await updateFAQInSupabase(id, {
      question: updates.question,
      answer: updates.answer,
      order_index: updates.order || updates.order_index
    });
  };

  const deleteFAQ = async (id: string) => {
    await deleteFAQFromSupabase(id);
  };

  // Gallery management
  const addGalleryItem = async (itemData: any) => {
    await addGalleryItemToSupabase({
      title: itemData.title,
      description: itemData.description,
      image_url: itemData.image || itemData.image_url || '',
      category: itemData.category
    });
  };

  const updateGalleryItem = async (id: string, updates: any) => {
    await updateGalleryItemInSupabase(id, {
      title: updates.title,
      description: updates.description,
      image_url: updates.image || updates.image_url,
      category: updates.category
    });
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteGalleryItemFromSupabase(id);
  };

  // Admin authentication
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        toast({
          title: 'خطأ',
          description: 'اسم المستخدم غير صحيح',
          variant: 'destructive',
        });
        return false;
      }

      // For now, simple password check. In production, use proper hashing
      if (data.password_hash === password) {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        toast({
          title: 'تم بنجاح',
          description: 'تم تسجيل الدخول بنجاح',
        });
        return true;
      } else {
        toast({
          title: 'خطأ',
          description: 'كلمة المرور غير صحيحة',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تسجيل الدخول',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Check admin status on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <StoreContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      productsLoading,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      favorites,
      addToFavorites,
      removeFromFavorites,
      messages,
      addMessage,
      markMessageAsRead,
      deleteMessage,
      messagesLoading,
      reviews,
      addReview,
      deleteReview,
      reviewsLoading,
      comments,
      addComment,
      deleteComment,
      commentsLoading,
      faqs,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      faqsLoading,
      galleryItems,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      galleryLoading,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};