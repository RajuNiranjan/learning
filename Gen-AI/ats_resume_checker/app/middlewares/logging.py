import time

async def log_middleware(request, call_next):
    start_time=time.time()
    response=await call_next(request)
    duration=round(time.time() - start_time, 2)
    print(f"{request.method} {request.url} - {duration} ")
    return response