from rest_framework.routers import DefaultRouter
from app.bean.views import BeansViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r"beans", BeansViewSet, basename="beans")
urlpatterns = router.urls
