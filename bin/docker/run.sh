docker run \
-v `pwd`/apps:/cmdk/apps \
-v `pwd`/docs:/cmdk/docs \
-v `pwd`/node_modules:/cmdk/node_modules \
-v `pwd`/packages:/cmdk/packages \
cmdk-build