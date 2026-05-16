import multiprocessing

# Gunicorn Production Configuration for AWS EC2 / App Runner
bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "gthread"
threads = 2
timeout = 120
keepalive = 5
errorlog = "-"
accesslog = "-"
loglevel = "info"
