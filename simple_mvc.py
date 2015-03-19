# MVC: A GENERIC ARCHITECTURE FOR MAKING APPS THAT DISPLAY DATA

# MODEL: A LIST OF OBJECTS. TYPICALLY FROM A DATABASE
class Model(object):
    def __init__(self, name, fields):
        self.name = name
        self.fields = fields
        self.objects = []

    def create(self, item):
        self.objects.append(item)


# VIEW: A TEMPLATE FOR A PAGE OR PAGE FRAGMENT
class View(object):
    def __init__(self, template, model):
        self.template = template
        self.model = model

    def render(self):
        output = ""
        for item in self.model.objects:
            item_template = self.template
            for field in self.model.fields:
                if item.has_key(field):
                    item_template = item_template.replace("{{" + field + "}}", item[field])
            output += item_template
        return output


# CONTROLLER: Routes messages
class Controller(object):
    def __init__(self):
        self.routes = {}

    def route(self, path):
        return self.routes[path].render()


# CONTAINS THE SINGLE CONTROLLER AND ALL MODEL AND VIEW INSTANCES
class Application():
    def __init__(self):
        self.models = {}
        self.views = {}
        self.controller = Controller()

# CREATE AN APPLICATION INSTANCE
app = Application()

# define models (
app.models["plantation"] = Model("plantation", ["name", "location", "age"])
app.models["game"] = Model("game", ["game_name", "description"])

# load model objects form database tables
app.models["plantation"].objects = [
    {"name": "Rural Hall", "location": "Oatland", "age": "123"},
    {"name": "Brick Chimney", "location": "Georgetown", "age": "128"},
    {"name": "Leavy Hall", "location": "Oatland", "age": "143"},
    {"name": "Linen Loop", "location": "Dunbar", "age": "147"}]

template_plantation ="\nWelcome to <em>{{name}}</em>, located in scenic <strong>{{location}}</strong>, SC. This location is <strong>{{age}}</strong> years old.<br>\n"
template = "\nHello <em>{{name}}</em>, your score is <strong>{{score}}</strong>.<br>\n",
template_results = "\nHello <em>{{name}}</em>, your rank is <strong>{{score}}</strong>.<br>\n"

view = View(template, app.models["plantation"])
# view_results = View(template_plantation, app.models["plantation"])

app.controller.routes = {
    "/scores/": view,
    "/results/": view
}

# request_path = "/results/"
# print(app.controller.route(request_path))
request_path = "/scores/"
print(app.controller.route(request_path))