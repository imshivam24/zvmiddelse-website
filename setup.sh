!#/bin/bash
chmod 777 public/php/vendor/ezyang/htmlpurifier/library/HTMLPurifier/DefinitionCache/Serializer
cd static && compass compile -e production
cd ../
composer update
