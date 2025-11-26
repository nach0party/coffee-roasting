from rest_framework.routers import DefaultRouter
from app.bean.views import BeansViewSet

router = DefaultRouter()
router.register(r"beans", BeansViewSet, basename="beans")
urlpatterns = router.urls
