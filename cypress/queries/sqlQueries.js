class SqlQueries
{
    getQuerySQL(sql, params = null) {
        if (params != null) {
            if (params instanceof Map) {
                Object.keys(params).map((key) => {
                    sql = sql.replace(`:${key}`, params[key]);
                });
            } else if (params instanceof Object) {
                Object.entries(params).map(([key, value]) => {
                    sql = sql.replace(`:${key}`, value);
                });
            }
        }
        return sql;
    }
}
export default SqlQueries;