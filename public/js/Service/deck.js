common.factory('Deck', function ($resource) {
    'use strict';

    return $resource('/api/deck/:id',
        { id: '@id' }, {
            getAll: { method: 'GET', isArray: true },
            get: { method: 'GET' },
            create: { method: 'POST' },
            save: { method: 'PUT' },
            remove: { method: 'DELETE' }
        }
    );
});