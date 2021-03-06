common.factory('News', function ($resource) {
    'use strict';

    return $resource('/api/news/:id',
        { id: '@id' }, {
            getAll: { method: 'GET', isArray: true },
            get: { method: 'GET' },
            create: { method: 'POST' },
            save: { method: 'PUT' },
            remove: { method: 'DELETE' }
        }
    );
});