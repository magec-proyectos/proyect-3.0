import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.sports": "Sports",
      "nav.social": "Social",
      "nav.casino": "Casino",
      "nav.profile": "Profile",
      "nav.wallet": "Wallet",
      "nav.settings": "Settings",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "Something went wrong",
      "common.retry": "Try again",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.share": "Share",
      "common.like": "Like",
      "common.comment": "Comment",
      "common.follow": "Follow",
      "common.unfollow": "Unfollow",
      "common.send": "Send",
      
      // Social Feed
      "social.feed.title": "Social Feed",
      "social.feed.placeholder": "Share your next winning prediction...",
      "social.feed.post": "Post Prediction",
      "social.feed.foryou": "For you",
      "social.feed.following": "Following",
      "social.feed.empty": "No predictions yet. Be the first to share!",
      "social.feed.create.success": "Post created successfully!",
      "social.feed.create.error": "Failed to create post",
      
      // Stories
      "stories.add": "Add Story",
      "stories.create": "Create Story",
      "stories.content.placeholder": "What's on your mind?",
      "stories.image.placeholder": "Image URL or caption...",
      "stories.video.placeholder": "Video URL or caption...",
      "stories.text": "Text",
      "stories.image": "Image",
      "stories.video": "Video",
      "stories.creating": "Creating...",
      "stories.your": "Your Story",
      
      // Copy Trading
      "copytrading.title": "Copy Trading",
      "copytrading.subtitle": "Follow expert traders and copy their strategies",
      "copytrading.become.expert": "Become Expert",
      "copytrading.experts": "Expert Traders",
      "copytrading.my.copies": "My Copies",
      "copytrading.profit.30d": "30d Profit",
      "copytrading.win.rate": "Win Rate",
      "copytrading.risk.low": "low risk",
      "copytrading.risk.medium": "medium risk",
      "copytrading.risk.high": "high risk",
      "copytrading.copy": "Copy",
      "copytrading.stop": "Stop Copying",
      "copytrading.followers": "followers",
      
      // Wallet
      "wallet.title": "Wallet Overview",
      "wallet.balance": "Current Balance",
      "wallet.earned": "Total Earned",
      "wallet.spent": "Total Spent",
      "wallet.add.funds": "Add Funds",
      "wallet.withdraw": "Withdraw",
      "wallet.send.tip": "Send Tip",
      "wallet.transactions": "Recent Transactions",
      "wallet.no.transactions": "No transactions yet",
      "wallet.tip.sent": "Sent to",
      "wallet.tip.received": "Received from",
      
      // Notifications
      "notifications.title": "Notifications",
      "notifications.empty": "No new notifications",
      "notifications.subtitle": "We'll notify you when something happens",
      "notifications.like": "New Like",
      "notifications.comment": "New Comment",
      "notifications.follow": "New Follower",
      "notifications.tip": "Tip Received",
      
      // Accessibility
      "a11y.main.content": "Main content",
      "a11y.navigation": "Main navigation",
      "a11y.skip.link": "Skip to main content",
      "a11y.menu.toggle": "Toggle navigation menu",
      "a11y.user.menu": "User menu",
      "a11y.search": "Search",
      "a11y.post.reactions": "Post reactions",
      "a11y.story.view": "View story",
      "a11y.loading": "Content is loading",
      
      // Errors
      "error.network": "Network error. Please check your connection.",
      "error.auth": "Please sign in to continue",
      "error.permission": "You don't have permission for this action",
      "error.validation": "Please check your input and try again"
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.home": "Inicio",
      "nav.sports": "Deportes",
      "nav.social": "Social",
      "nav.casino": "Casino",
      "nav.profile": "Perfil",
      "nav.wallet": "Cartera",
      "nav.settings": "Configuración",
      
      // Common
      "common.loading": "Cargando...",
      "common.error": "Algo salió mal",
      "common.retry": "Intentar de nuevo",
      "common.save": "Guardar",
      "common.cancel": "Cancelar",
      "common.delete": "Eliminar",
      "common.edit": "Editar",
      "common.share": "Compartir",
      "common.like": "Me gusta",
      "common.comment": "Comentar",
      "common.follow": "Seguir",
      "common.unfollow": "Dejar de seguir",
      "common.send": "Enviar",
      
      // Social Feed
      "social.feed.title": "Feed Social",
      "social.feed.placeholder": "Comparte tu próxima predicción ganadora...",
      "social.feed.post": "Publicar Predicción",
      "social.feed.foryou": "Para ti",
      "social.feed.following": "Siguiendo",
      "social.feed.empty": "No hay predicciones aún. ¡Sé el primero en compartir!",
      "social.feed.create.success": "¡Publicación creada exitosamente!",
      "social.feed.create.error": "Error al crear la publicación",
      
      // Stories
      "stories.add": "Agregar Historia",
      "stories.create": "Crear Historia",
      "stories.content.placeholder": "¿Qué tienes en mente?",
      "stories.image.placeholder": "URL de imagen o descripción...",
      "stories.video.placeholder": "URL de video o descripción...",
      "stories.text": "Texto",
      "stories.image": "Imagen",
      "stories.video": "Video",
      "stories.creating": "Creando...",
      "stories.your": "Tu Historia",
      
      // Copy Trading
      "copytrading.title": "Copy Trading",
      "copytrading.subtitle": "Sigue traders expertos y copia sus estrategias",
      "copytrading.become.expert": "Ser Experto",
      "copytrading.experts": "Traders Expertos",
      "copytrading.my.copies": "Mis Copias",
      "copytrading.profit.30d": "Ganancia 30d",
      "copytrading.win.rate": "Tasa de Éxito",
      "copytrading.risk.low": "riesgo bajo",
      "copytrading.risk.medium": "riesgo medio",
      "copytrading.risk.high": "riesgo alto",
      "copytrading.copy": "Copiar",
      "copytrading.stop": "Dejar de Copiar",
      "copytrading.followers": "seguidores",
      
      // Wallet
      "wallet.title": "Resumen de Cartera",
      "wallet.balance": "Saldo Actual",
      "wallet.earned": "Total Ganado",
      "wallet.spent": "Total Gastado",
      "wallet.add.funds": "Agregar Fondos",
      "wallet.withdraw": "Retirar",
      "wallet.send.tip": "Enviar Propina",
      "wallet.transactions": "Transacciones Recientes",
      "wallet.no.transactions": "No hay transacciones aún",
      "wallet.tip.sent": "Enviado a",
      "wallet.tip.received": "Recibido de",
      
      // Notifications
      "notifications.title": "Notificaciones",
      "notifications.empty": "No hay notificaciones nuevas",
      "notifications.subtitle": "Te notificaremos cuando algo suceda",
      "notifications.like": "Nuevo Me Gusta",
      "notifications.comment": "Nuevo Comentario",
      "notifications.follow": "Nuevo Seguidor",
      "notifications.tip": "Propina Recibida",
      
      // Accessibility
      "a11y.main.content": "Contenido principal",
      "a11y.navigation": "Navegación principal",
      "a11y.skip.link": "Saltar al contenido principal",
      "a11y.menu.toggle": "Alternar menú de navegación",
      "a11y.user.menu": "Menú de usuario",
      "a11y.search": "Buscar",
      "a11y.post.reactions": "Reacciones de publicación",
      "a11y.story.view": "Ver historia",
      "a11y.loading": "El contenido se está cargando",
      
      // Errors
      "error.network": "Error de red. Por favor verifica tu conexión.",
      "error.auth": "Por favor inicia sesión para continuar",
      "error.permission": "No tienes permisos para esta acción",
      "error.validation": "Por favor verifica tu entrada e intenta de nuevo"
    }
  },
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.sports": "Sports",
      "nav.social": "Social",
      "nav.casino": "Casino",
      "nav.profile": "Profil",
      "nav.wallet": "Portefeuille",
      "nav.settings": "Paramètres",
      
      // Common
      "common.loading": "Chargement...",
      "common.error": "Quelque chose s'est mal passé",
      "common.retry": "Réessayer",
      "common.save": "Enregistrer",
      "common.cancel": "Annuler",
      "common.delete": "Supprimer",
      "common.edit": "Modifier",
      "common.share": "Partager",
      "common.like": "J'aime",
      "common.comment": "Commenter",
      "common.follow": "Suivre",
      "common.unfollow": "Ne plus suivre",
      "common.send": "Envoyer",
      
      // Social Feed
      "social.feed.title": "Fil Social",
      "social.feed.placeholder": "Partagez votre prochaine prédiction gagnante...",
      "social.feed.post": "Publier Prédiction",
      "social.feed.foryou": "Pour vous",
      "social.feed.following": "Abonnements",
      "social.feed.empty": "Aucune prédiction pour le moment. Soyez le premier à partager !",
      "social.feed.create.success": "Publication créée avec succès !",
      "social.feed.create.error": "Échec de la création de publication",
      
      // Stories
      "stories.add": "Ajouter Story",
      "stories.create": "Créer Story",
      "stories.content.placeholder": "À quoi pensez-vous ?",
      "stories.image.placeholder": "URL d'image ou légende...",
      "stories.video.placeholder": "URL de vidéo ou légende...",
      "stories.text": "Texte",
      "stories.image": "Image",
      "stories.video": "Vidéo",
      "stories.creating": "Création...",
      "stories.your": "Votre Story",
      
      // Copy Trading
      "copytrading.title": "Copy Trading",
      "copytrading.subtitle": "Suivez des traders experts et copiez leurs stratégies",
      "copytrading.become.expert": "Devenir Expert",
      "copytrading.experts": "Traders Experts",
      "copytrading.my.copies": "Mes Copies",
      "copytrading.profit.30d": "Profit 30j",
      "copytrading.win.rate": "Taux de Réussite",
      "copytrading.risk.low": "risque faible",
      "copytrading.risk.medium": "risque moyen",
      "copytrading.risk.high": "risque élevé",
      "copytrading.copy": "Copier",
      "copytrading.stop": "Arrêter de Copier",
      "copytrading.followers": "abonnés",
      
      // Wallet
      "wallet.title": "Aperçu du Portefeuille",
      "wallet.balance": "Solde Actuel",
      "wallet.earned": "Total Gagné",
      "wallet.spent": "Total Dépensé",
      "wallet.add.funds": "Ajouter des Fonds",
      "wallet.withdraw": "Retirer",
      "wallet.send.tip": "Envoyer Pourboire",
      "wallet.transactions": "Transactions Récentes",
      "wallet.no.transactions": "Aucune transaction pour le moment",
      "wallet.tip.sent": "Envoyé à",
      "wallet.tip.received": "Reçu de",
      
      // Notifications
      "notifications.title": "Notifications",
      "notifications.empty": "Aucune nouvelle notification",
      "notifications.subtitle": "Nous vous notifierons quand quelque chose se passe",
      "notifications.like": "Nouveau J'aime",
      "notifications.comment": "Nouveau Commentaire",
      "notifications.follow": "Nouvel Abonné",
      "notifications.tip": "Pourboire Reçu",
      
      // Accessibility
      "a11y.main.content": "Contenu principal",
      "a11y.navigation": "Navigation principale",
      "a11y.skip.link": "Aller au contenu principal",
      "a11y.menu.toggle": "Basculer le menu de navigation",
      "a11y.user.menu": "Menu utilisateur",
      "a11y.search": "Rechercher",
      "a11y.post.reactions": "Réactions de publication",
      "a11y.story.view": "Voir la story",
      "a11y.loading": "Le contenu se charge",
      
      // Errors
      "error.network": "Erreur réseau. Veuillez vérifier votre connexion.",
      "error.auth": "Veuillez vous connecter pour continuer",
      "error.permission": "Vous n'avez pas la permission pour cette action",
      "error.validation": "Veuillez vérifier votre saisie et réessayer"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;