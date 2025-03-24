from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.db import connection
from .forms import TableForm
def show_tables(request):
    # Get all tables
    with connection.cursor() as cursor:
        cursor.execute("SHOW TABLES")  # For MySQL
        tables = cursor.fetchall()
    
    context = {
        'tables': tables,
    }
    
    # Try to get sample data from a table
    try:
        # Replace 'users' with your actual table name
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users LIMIT 5")  # Change 'users' to your table
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
        
        context.update({
            'rows': rows,
            'columns': columns,
        })
    except Exception as e:
        context['error'] = str(e)
    
    return render(request, 'show_tables.html', context)

def get_table(request):
    if(request.method == "POST"):
        form = TableForm(request.POST)
        if(form.is_valid()):
            return HttpResponseRedirect("/thanks/")
    else:
        form = TableForm()
    return render(request, show_tables.html, {"form": form})


