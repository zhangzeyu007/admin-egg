''' 模拟网站JS中加密：
    request中的query string parameters：
        "z": "5d855143e6fd5d1a252ac6c34b2b7e0f",    
        "jx": "{}"
        "s1ig": "11399",                       
    
    js文件的定义：
    c = new Date,
    l = c.getTime(),
    u = 6e4 * c.getTimezoneOffset(),
    d = l + u + 36e5 * 8,
    m = new Date(d),
    p = (p = m).getDate() + 9 + 9 ^ 10,
    p = (p = St()(String(p))).substring(0, 10),
    p = St()(p),
    b = m.getDay() + 11397,
    v = "//a1.m1907.cn/api/v/?z=".concat(p, "&jx=").concat(o),
    v += "&s1ig=".concat(b),
'''
def MD5p() :
    lt = datetime.datetime.now()
    ut = datetime.datetime.utcnow()
    o = ((ut.day-lt.day)*24+ut.hour-lt.hour)*60
    #o = (ut.hour-lt.hour)*60
 
    l = int(time.time()*1000)
    u = int(6e4 * o)            
    d = int(l + u + 36e5 * 8)
    m = time.strptime(time.ctime(d/1000)).tm_mday
    p = str(m+ 9 + 9^10) 
    b = lt.weekday()+1 + 11397
 
    p=md5(p.encode()).hexdigest()
    p=md5(p[0:10].encode()).hexdigest()
 
    return p, b