from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class ArtPiece(models.Model):
    art_id = models.AutoField(primary_key=True)
    type_of_art = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    stock_amount = models.IntegerField()
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    # location = models.ForeignKey('Location', models.DO_NOTHING)
    user = models.ForeignKey('Users', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'art_piece'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class BaseItem(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'base_item'


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True) # the name of the field in your Django model. It will correspond to the cart_id column in your cart database table.
    user = models.OneToOneField('Users', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'cart'


class CartArtPiece(models.Model):
    cart_art_id = models.AutoField(primary_key=True)
    cart = models.ForeignKey(Cart, models.DO_NOTHING, related_name='items_in_cart')  # Added related_name
    art = models.ForeignKey(ArtPiece, models.DO_NOTHING, related_name='added_to_carts') # Added related_name (example)

    class Meta:
        managed = False
        db_table = 'cart_art_piece'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    county = models.CharField(max_length=45)
    state = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'location'


class PurchaseOrder(models.Model):
    purchase_order_id = models.AutoField(primary_key=True)
    date_purchased = models.DateField()
    buyer = models.ForeignKey('Users', models.DO_NOTHING)
    seller = models.ForeignKey('Users', models.DO_NOTHING, related_name='purchaseorder_seller_set')

    class Meta:
        managed = False
        db_table = 'purchase_order'


class PurchaseOrderArtPiece(models.Model):
    purchase_order_art_id = models.AutoField(primary_key=True)
    purchase_order = models.ForeignKey(PurchaseOrder, models.DO_NOTHING)
    art = models.ForeignKey(ArtPiece, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'purchase_order_art_piece'


class Reviews(models.Model):
    review_id = models.AutoField(primary_key=True)
    rating = models.IntegerField(blank=True, null=True)
    reviewer = models.ForeignKey('Users', models.DO_NOTHING)
    reviewed = models.ForeignKey('Users', models.DO_NOTHING, related_name='reviews_reviewed_set')

    class Meta:
        managed = False
        db_table = 'reviews'


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=45)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.CharField(unique=True, max_length=255)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)


    class Meta:
        managed = False
        db_table = 'users'