from rest_framework.routers import DefaultRouter
from app.beans.views import BeansViewSet

router = DefaultRouter()
router.register(r"beans", BeansViewSet, basename="beans")
urlpatterns = router.urls
