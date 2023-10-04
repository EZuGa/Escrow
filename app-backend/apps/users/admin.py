from django.contrib import admin

from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'record_date', 'update_date')
    readonly_fields = ('record_date', 'update_date')



class DirectoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'name',)

class FileAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_user', 'file',)

    def get_user(self, obj):
        return obj.directory.user
    get_user.short_description = 'User'
    get_user.admin_order_field = 'directory__user'
admin.site.register(User, UserAdmin)
admin.site.register(File,FileAdmin)
admin.site.register(Directory, DirectoryAdmin)

admin.site.register(Message)

