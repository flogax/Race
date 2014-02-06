common.factory('Typ', function ($resource) {
    'use strict';

    return $resource('/api/typ/:id',
        { id: '@id' }, {
            getAll: { method: 'GET', isArray: true },
            get: { method: 'GET' },
            create: { method: 'POST' },
            save: { method: 'PUT' },
            remove: { method: 'DELETE' }
        }
    );
});