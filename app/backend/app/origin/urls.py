from rest_framework.routers import DefaultRouter
from app.origin.views import OriginViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r"origins", OriginViewSet, basename="origin")
urlpatterns = router.urls
