(function () {
    var _ = typeof require == 'function' ? require('..') : window._;
    var templateSettings;

    QUnit.module('utility', {

        beforeEach: function () {
            templateSettings = _.clone(_.templateSettings);
        },

        afterEach: function () {
            _.templateSettings = templateSettings;
        }
    });

    QUnit.test('获取随机数：getRandom', function (assert) {
        var array = _.range(1000);
        var min = Math.pow(2, 31);
        var max = Math.pow(2, 62);
        assert.ok(_.every(array, function () {
            return _.getRandom(min, max) >= min;
        }), '是否应该产生一个大于或等于最小值的随机数');

        assert.ok(_.some(array, function () {
            return _.getRandom(Number.MAX_VALUE) > 0;
        }), '当传递“Number.MAX_VALUE”时，应该生成一个随机数');
    });

    QUnit.test('字节格式化：formatBytes', function (assert) {
        assert.ok(_.formatBytes(1024) == '1 KB', '1KB转换正确');
        assert.ok(_.formatBytes('1024') == '1 KB', '1KB转换正确');
        assert.ok(_.formatBytes(1234) == '1.21 KB', '1.21KB转换正确');
        assert.ok(_.formatBytes(1234, 3) == '1.205 KB', '1.205KB转换正确');
    });

    QUnit.test('比较两个数值的大小：numCompare', function (assert) {
        assert.ok(_.numCompare(3, 5) == -1, '3<5,判断正确');
        assert.throws(function () {
            _.numCompare('ab', 3)
        }, 'ab与3是不同类型无法判断');
        assert.ok(_.numCompare(3, 3) == 0, '3>3，两个数值相等,判断错误');
        assert.ok(_.numCompare(0.1, 0.11) == -1, '0.1<0.11,判断正确');
        assert.ok(_.numCompare(-1, -2) == 1, '-1>-2,判断正确');
        assert.ok(_.numCompare(0, -1) == 1, '0>-1,判断正确');
    });
	
	QUnit.test('去左空格：ltrim', function (assert) {
		assert.ok(_.ltrim('    abcdegfg',' ') == 'abcdegfg','    abcdegfg去除左空格成功');
		assert.ok(_.ltrim('  dff  fad',' ') =='dff  fad','  dff  fad去除左空格成功');
		assert.ok(_.ltrim('dff  fad',' ') =='dff  fad','dff  fad去除左空格成功');
		assert.ok(_.ltrim('_ad',' ') =='_ad','_ad不含左空格');
	});
	
	QUnit.test('去右空格：rtrim', function (assert) {
		assert.ok(_.rtrim('abcdegfg     ',' ') == 'abcdegfg','abcdegfg     去除右空格成功');
		assert.ok(_.rtrim('abcd  egfg     ',' ') == 'abcd  egfg','abcd  egfg     去除右空格成功');
		assert.ok(_.rtrim('abcd  egfg',' ') == 'abcd  egfg','abcd  egfg去除右空格成功');
		assert.ok(_.rtrim('ab——',' ') == 'ab——','ab——不含右空格');	
	});
	
	QUnit.test('判断是否为数组:_.isArray',function(assert){
        assert.ok(_.isArray({1:2}) == false,'{1:2}不是数组');
        assert.ok(_.isArray([{1:2},{1:3}]) == true,'[{1:2},{1:3}]是数组');
        assert.ok(_.isArray([1]) == true,'[1]是数组');
		assert.ok(_.isArray([1],[2]) == true,'[1],[2]是数组');
        //assert.ok(_.isArray(a) == false,'a不是数组');
        assert.ok(_.isArray('a') == false,'不是数组');
        assert.ok(_.isArray("a") == false,'"a"不是数组');
        assert.ok(_.isArray(123) == false,'123不是数组');
        assert.ok(_.isArray(null) == false,'null不是数组');
        assert.ok(_.isArray(undefined) == false,'undefinded不是数组');
    });
}());
