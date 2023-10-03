from django.contrib import admin

from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'record_date', 'update_date')
    readonly_fields = ('record_date', 'update_date')  # This makes sure they are not editable

admin.site.register(User, UserAdmin)
