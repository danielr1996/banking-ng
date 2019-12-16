for f in $(ls main*.js); do envsubst '$GRAPHQL_API' < $f > temp.subst && mv temp.subst $f; done
nginx -g 'daemon off;'
