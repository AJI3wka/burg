;

'use strict';

console.log('map.model start');

var map = {
    model: {},
    view: {},
    events: {},
    controller: {},
    init: function() {}
}

map.model = {
	map:false,
    bounds:false,
    /*polygon_items:[{
            lat: 49.8271945,
            lng: 23.9546877
        },{
            lat: 49.8253586,
            lng: 23.9554897
        },{
            lat: 49.8239588,
            lng: 23.9561199
        },{
            lat: 49.8236249,
            lng: 23.9562192
        },{
            lat: 49.8231602,
            lng: 23.9602708
        },{
            lat: 49.8226541,
            lng: 23.9601702
        },{
            lat: 49.8219809,
            lng: 23.9597866
        },{
            lat: 49.8218901,
            lng: 23.9600937
        },{
            lat: 49.8217754,
            lng: 23.9607408
        },{
            lat: 49.8217666,
            lng: 23.9611179
        },{
            lat: 49.8209246,
            lng: 23.9608452
        },{
            lat: 49.8206848,
            lng: 23.9620959
        },{
            lat: 49.820478,
            lng: 23.9621
        },{
            lat: 49.8204267,
            lng: 23.9621057
        },{
            lat: 49.8203333,
            lng: 23.9620566
        },{
            lat: 49.8202175,
            lng: 23.9620373
        },{
            lat: 49.8199597,
            lng: 23.9619216
        },{
            lat: 49.8198637,
            lng: 23.9628377
        },{
            lat: 49.8197122,
            lng: 23.9637322
        },{
            lat: 49.8195824,
            lng: 23.9639869
        },{
            lat: 49.8190373,
            lng: 23.9643598
        },{
            lat: 49.8201933,
            lng: 23.9678466
        },{
            lat: 49.8189404,
            lng: 23.9681363
        },{
            lat: 49.8188885,
            lng: 23.9675865
        },{
            lat: 49.8187397,
            lng: 23.9671654
        },{
            lat: 49.8176718,
            lng: 23.9662764
        },{
            lat: 49.816784,
            lng: 23.96587
        },{
            lat: 49.8158555,
            lng: 23.9658063
        },{
            lat: 49.8154116,
            lng: 23.9660002
        },{
            lat: 49.8172107,
            lng: 23.9692892
        },{
            lat: 49.8172652,
            lng: 23.9704967
        },{
            lat: 49.8171647,
            lng: 23.972106
        },{
            lat: 49.815501,
            lng: 23.9739621
        },{
            lat: 49.8141281,
            lng: 23.9761615
        },{
            lat: 49.8116081,
            lng: 23.971076
        },{
            lat: 49.8105776,
            lng: 23.9694668
        },{
            lat: 49.8098435,
            lng: 23.9763872
        },{
            lat: 49.80679,
            lng: 23.9756629
        },{
            lat: 49.806996,
            lng: 23.9728426
        },{
            lat: 49.8043216,
            lng: 23.9721786
        },{
            lat: 49.801874,
            lng: 23.9741123
        },{
            lat: 49.8013349,
            lng: 23.9806155
        },{
            lat: 49.8010689,
            lng: 23.9828636
        },{
            lat: 49.8008112,
            lng: 23.9842235
        },{
            lat: 49.799962,
            lng: 23.9857616
        },{
            lat: 49.7994681,
            lng: 23.989084
        },{
            lat: 49.7993594,
            lng: 23.9916891
        },{
            lat: 49.799035,
            lng: 23.9944937
        },{
            lat: 49.7985541,
            lng: 23.9986317
        },{
            lat: 49.7978772,
            lng: 24.0053998
        },{
            lat: 49.7970502,
            lng: 24.0131397
        },{
            lat: 49.7968721,
            lng: 24.0150462
        },{
            lat: 49.7966559,
            lng: 24.0161641
        },{
            lat: 49.7941122,
            lng: 24.014847
        },{
            lat: 49.7924006,
            lng: 24.0142691
        },{
            lat: 49.790454,
            lng: 24.0137118
        },{
            lat: 49.7891793,
            lng: 24.0132723
        },{
            lat: 49.7890304,
            lng: 24.0132832
        },{
            lat: 49.7889905,
            lng: 24.0141416
        },{
            lat: 49.7873428,
            lng: 24.0142918
        },{
            lat: 49.7876138,
            lng: 24.0158367
        },{
            lat: 49.7873508,
            lng: 24.0202465
        },{
            lat: 49.7868106,
            lng: 24.0245273
        },{
            lat: 49.7845382,
            lng: 24.032209
        },{
            lat: 49.7849123,
            lng: 24.0338934
        },{
            lat: 49.7946746,
            lng: 24.0320186
        },{
            lat: 49.8000736,
            lng: 24.0329117
        },{
            lat: 49.7999247,
            lng: 24.0365837
        },{
            lat: 49.8004474,
            lng: 24.0404057
        },{
            lat: 49.8001296,
            lng: 24.0404661
        },{
            lat: 49.7993686,
            lng: 24.0400116
        },{
            lat: 49.7983522,
            lng: 24.0393813
        },{
            lat: 49.7974273,
            lng: 24.0391293
        },{
            lat: 49.7965218,
            lng: 24.0395988
        },{
            lat: 49.7951964,
            lng: 24.0405416
        },{
            lat: 49.7945475,
            lng: 24.0412277
        },{
            lat: 49.794328,
            lng: 24.0421068
        },{
            lat: 49.7942814,
            lng: 24.0427477
        },{
            lat: 49.7946321,
            lng: 24.0444307
        },{
            lat: 49.794849,
            lng: 24.0455616
        },{
            lat: 49.7948327,
            lng: 24.0484554
        },{
            lat: 49.7945061,
            lng: 24.0498591
        },{
            lat: 49.794466,
            lng: 24.0503548
        },{
            lat: 49.7945367,
            lng: 24.0508721
        },{
            lat: 49.7940015,
            lng: 24.0527253
        },{
            lat: 49.792321,
            lng: 24.0534158
        },{
            lat: 49.7890646,
            lng: 24.0543019
        },{
            lat: 49.7887977,
            lng: 24.0539816
        },{
            lat: 49.7874225,
            lng: 24.0527172
        },{
            lat: 49.7877962,
            lng: 24.0515494
        },{
            lat: 49.7883778,
            lng: 24.0508965
        },{
            lat: 49.7885297,
            lng: 24.0502265
        },{
            lat: 49.788446,
            lng: 24.0495779
        },{
            lat: 49.7880501,
            lng: 24.0485277
        },{
            lat: 49.7880847,
            lng: 24.0481522
        },{
            lat: 49.7872777,
            lng: 24.0468807
        },{
            lat: 49.7865695,
            lng: 24.0462879
        },{
            lat: 49.785197,
            lng: 24.0467534
        },{
            lat: 49.7836168,
            lng: 24.0471652
        },{
            lat: 49.7817013,
            lng: 24.0465589
        },{
            lat: 49.7806986,
            lng: 24.0473448
        },{
            lat: 49.7796612,
            lng: 24.047165
        },{
            lat: 49.7795226,
            lng: 24.04886
        },{
            lat: 49.7808111,
            lng: 24.0518319
        },{
            lat: 49.7808839,
            lng: 24.0520812
        },{
            lat: 49.780915,
            lng: 24.0523093
        },{
            lat: 49.7809116,
            lng: 24.0528271
        },{
            lat: 49.7808666,
            lng: 24.0536238
        },{
            lat: 49.7811991,
            lng: 24.0594711
        },{
            lat: 49.7810744,
            lng: 24.0613325
        },{
            lat: 49.7812129,
            lng: 24.0687406
        },{
            lat: 49.7820789,
            lng: 24.0685369
        },{
            lat: 49.783499,
            lng: 24.0695989
        },{
            lat: 49.7846213,
            lng: 24.0702535
        },{
            lat: 49.7852239,
            lng: 24.069953
        },{
            lat: 49.785449,
            lng: 24.0710687
        },{
            lat: 49.78685,
            lng: 24.0715194
        },{
            lat: 49.787218,
            lng: 24.0706932
        },{
            lat: 49.788351,
            lng: 24.0721792
        },{
            lat: 49.7885919,
            lng: 24.0725789
        },{
            lat: 49.7889687,
            lng: 24.0728646
        },{
            lat: 49.7891848,
            lng: 24.073501
        },{
            lat: 49.7897569,
            lng: 24.0734436
        },{
            lat: 49.7900222,
            lng: 24.0729858
        },{
            lat: 49.7907089,
            lng: 24.0728857
        },{
            lat: 49.7913957,
            lng: 24.0726783
        },{
            lat: 49.7927151,
            lng: 24.0720184
        },{
            lat: 49.7942907,
            lng: 24.0699424
        },{
            lat: 49.7953504,
            lng: 24.0708543
        },{
            lat: 49.7955805,
            lng: 24.0717142
        },{
            lat: 49.7959064,
            lng: 24.0717413
        },{
            lat: 49.7959552,
            lng: 24.071983
        },{
            lat: 49.7980268,
            lng: 24.069795
        },{
            lat: 49.7981773,
            lng: 24.0695226
        },{
            lat: 49.7989317,
            lng: 24.0685374
        },{
            lat: 49.7996029,
            lng: 24.066522
        },{
            lat: 49.8001699,
            lng: 24.0647228
        },{
            lat: 49.8006472,
            lng: 24.0650285
        },{
            lat: 49.8020397,
            lng: 24.06571
        },{
            lat: 49.8038716,
            lng: 24.064098
        },{
            lat: 49.8060356,
            lng: 24.062357
        },{
            lat: 49.806818,
            lng: 24.0610052
        },{
            lat: 49.8073511,
            lng: 24.0559626
        },{
            lat: 49.808047,
            lng: 24.0506736
        },{
            lat: 49.8084642,
            lng: 24.0485439
        },{
            lat: 49.8085481,
            lng: 24.047243
        },{
            lat: 49.8102937,
            lng: 24.0468433
        },{
            lat: 49.8127791,
            lng: 24.0461136
        },{
            lat: 49.8133607,
            lng: 24.0460331
        },{
            lat: 49.8146485,
            lng: 24.0461671
        },{
            lat: 49.8161005,
            lng: 24.045679
        },{
            lat: 49.8175249,
            lng: 24.0450193
        },{
            lat: 49.8181669,
            lng: 24.0442147
        },{
            lat: 49.8186844,
            lng: 24.0430881
        },{
            lat: 49.8195081,
            lng: 24.0409638
        },{
            lat: 49.8212386,
            lng: 24.0398854
        },{
            lat: 49.8231767,
            lng: 24.0385712
        },{
            lat: 49.8245895,
            lng: 24.0378872
        },{
            lat: 49.8258778,
            lng: 24.037064
        },{
            lat: 49.8263778,
            lng: 24.0364042
        },{
            lat: 49.8284161,
            lng: 24.0343979
        },{
            lat: 49.8297242,
            lng: 24.032724
        },{
            lat: 49.8302605,
            lng: 24.0337593
        },{
            lat: 49.8310183,
            lng: 24.0346015
        },{
            lat: 49.8319471,
            lng: 24.0352883
        },{
            lat: 49.8329382,
            lng: 24.0354491
        },{
            lat: 49.8342145,
            lng: 24.0358138
        },{
            lat: 49.8346125,
            lng: 24.0351476
        },{
            lat: 49.8349057,
            lng: 24.0352106
        },{
            lat: 49.8373328,
            lng: 24.0352508
        },{
            lat: 49.8388518,
            lng: 24.0356315
        },{
            lat: 49.8397461,
            lng: 24.0361641
        },{
            lat: 49.8401907,
            lng: 24.0365569
        },{
            lat: 49.8408169,
            lng: 24.0369566
        },{
            lat: 49.8420278,
            lng: 24.0365328
        },{
            lat: 49.8430543,
            lng: 24.0363363
        },{
            lat: 49.8438318,
            lng: 24.0360862
        },{
            lat: 49.8443075,
            lng: 24.0357791
        },{
            lat: 49.8447053,
            lng: 24.0360875
        },{
            lat: 49.845072,
            lng: 24.0360606
        },{
            lat: 49.8449665,
            lng: 24.0354732
        },{
            lat: 49.8444321,
            lng: 24.0336413
        },{
            lat: 49.8447884,
            lng: 24.029559
        },{
            lat: 49.8447814,
            lng: 24.027145
        },{
            lat: 49.8442677,
            lng: 24.0250475
        },{
            lat: 49.843242,
            lng: 24.0231216
        },{
            lat: 49.8429756,
            lng: 24.0212226
        },{
            lat: 49.8427779,
            lng: 24.0188569
        },{
            lat: 49.8427186,
            lng: 24.0178216
        },{
            lat: 49.8430028,
            lng: 24.0157134
        },{
            lat: 49.8444908,
            lng: 24.011202
        },{
            lat: 49.8456619,
            lng: 24.0076991
        },{
            lat: 49.8467913,
            lng: 24.00499
        },{
            lat: 49.8470161,
            lng: 24.0034987
        },{
            lat: 49.8483029,
            lng: 23.9996792
        },{
            lat: 49.8488961,
            lng: 23.9973617
        },{
            lat: 49.848417,
            lng: 23.9969326
        },{
            lat: 49.8480261,
            lng: 23.9962887
        },{
            lat: 49.8478065,
            lng: 23.9959643
        },{
            lat: 49.8475868,
            lng: 23.9959402
        },{
            lat: 49.8441518,
            lng: 23.9974153
        },{
            lat: 49.8407234,
            lng: 23.9993521
        },{
            lat: 49.839779,
            lng: 24.0001191
        },{
            lat: 49.8372465,
            lng: 24.0025278
        },{
            lat: 49.8368797,
            lng: 24.0020503
        },{
            lat: 49.835837,
            lng: 23.9965781
        },{
            lat: 49.8343372,
            lng: 23.9892717
        },{
            lat: 49.8323817,
            lng: 23.9782536
        },{
            lat: 49.82796707,
            lng: 23.95371415
        }],*/
        polygon_items:[{
            lat:49.8274679,
            lng: 23.9444255
        },{
            lat: 49.8247893,
            lng: 23.9472044
        },{
            lat: 49.8243152,
            lng: 23.9506537
        },{
            lat: 49.8239189,
            lng: 23.9532581
        },{
            lat: 49.8239588,
            lng: 23.9561199
        },{
            lat: 49.8236249,
            lng: 23.9562192
        },{
            lat: 49.8224957,
            lng: 23.956623
        },{
            lat: 49.8210759,
            lng: 23.95899
        },{
            lat: 49.8190044,
            lng: 23.9593145
        },{
            lat: 49.8167399,
            lng: 23.954858
        },{
            lat: 49.8162653,
            lng: 23.955548
        },{
            lat: 49.8138611,
            lng: 23.9567191
        },{
            lat: 49.8136559,
            lng: 23.9585707
        },{
            lat: 49.8120038,
            lng: 23.9624178
        },{
            lat: 49.8110901,
            lng: 23.9647051
        },{
            lat: 49.8110117,
            lng: 23.9675989
        },{
            lat: 49.8108327,
            lng: 23.96878
        },{
            lat: 49.8105776,
            lng: 23.9694668
        },{
            lat: 49.8098435,
            lng: 23.9763872
        },{
            lat: 49.80679,
            lng: 23.9756629
        },{
            lat: 49.806996,
            lng: 23.9728426
        },{
            lat: 49.8043216,
            lng: 23.9721786
        },{
            lat: 49.801874,
            lng: 23.9741123
        },{
            lat: 49.8013349,
            lng: 23.9806155
        },{
            lat: 49.7922874,
            lng: 23.979087
        },{
            lat: 49.7914478,
            lng: 23.9904033
        },{
            lat: 49.7913923,
            lng: 23.9965518
        },{
            lat: 49.7917712,
            lng: 24.0064785
        },{
            lat: 49.7723939,
            lng: 24.0086472
        },{
            lat: 49.7703911,
            lng: 24.024784
        },{
            lat: 49.7707375,
            lng: 24.0301492
        },{
            lat: 49.7845382,
            lng: 24.032209
        },{
            lat: 49.7849123,
            lng: 24.0338934
        },{
            lat: 49.7946746,
            lng: 24.0320186
        },{
            lat: 49.7947549,
            lng: 24.036817
        },{
            lat: 49.7945475,
            lng: 24.0412277
        },{
            lat: 49.794328,
            lng: 24.0421068
        },{
            lat: 49.7942814,
            lng: 24.0427477
        },{
            lat: 49.7946321,
            lng: 24.0444307
        },{
            lat: 49.794849,
            lng: 24.0455616
        },{
            lat: 49.7948327,
            lng: 24.0484554
        },{
            lat: 49.7945061,
            lng: 24.0498591
        },{
            lat: 49.794466,
            lng: 24.0503548
        },{
            lat: 49.7945367,
            lng: 24.0508721
        },{
            lat: 49.7940015,
            lng: 24.0527253
        },{
            lat: 49.792321,
            lng: 24.0534158
        },{
            lat: 49.7890646,
            lng: 24.0543019
        },{
            lat: 49.7887977,
            lng: 24.0539816
        },{
            lat: 49.7874225,
            lng: 24.0527172
        },{
            lat: 49.7877962,
            lng: 24.0515494
        },{
            lat: 49.7883778,
            lng: 24.0508965
        },{
            lat: 49.7885297,
            lng: 24.0502265
        },{
            lat: 49.788446,
            lng: 24.0495779
        },{
            lat: 49.7880501,
            lng: 24.0485277
        },{
            lat: 49.7880847,
            lng: 24.0481522
        },{
            lat: 49.7872777,
            lng: 24.0468807
        },{
            lat: 49.7865695,
            lng: 24.0462879
        },{
            lat: 49.785197,
            lng: 24.0467534
        },{
            lat: 49.7836168,
            lng: 24.0471652
        },{
            lat: 49.7817013,
            lng: 24.0465589
        },{
            lat: 49.7806986,
            lng: 24.0473448
        },{
            lat: 49.7796612,
            lng: 24.047165
        },{
            lat: 49.7795226,
            lng: 24.04886
        },{
            lat: 49.7808111,
            lng: 24.0518319
        },{
            lat: 49.7808839,
            lng: 24.0520812
        },{
            lat: 49.780915,
            lng: 24.0523093
        },{
            lat: 49.7809116,
            lng: 24.0528271
        },{
            lat: 49.7808666,
            lng: 24.0536238
        },{
            lat: 49.7811991,
            lng: 24.0594711
        },{
            lat: 49.7810744,
            lng: 24.0613325
        },{
            lat: 49.7812129,
            lng: 24.0687406
        },{
            lat: 49.7811645,
            lng: 24.0707256
        },{
            lat: 49.7815316,
            lng: 24.0733755
        },{
            lat: 49.7822383,
            lng: 24.0757896
        },{
            lat: 49.7826747,
            lng: 24.0762616
        },{
            lat: 49.784119,
            lng: 24.075489
        },{
            lat: 49.7862049,
            lng: 24.0759504
        },{
            lat: 49.7873487,
            lng: 24.0753389
        },{
            lat: 49.7881323,
            lng: 24.0748989
        },{
            lat: 49.7889328,
            lng: 24.0747112
        },{
            lat: 49.7891848,
            lng: 24.073501
        },{
            lat: 49.7897569,
            lng: 24.0734436
        },{
            lat: 49.7900222,
            lng: 24.0729858
        },{
            lat: 49.7907089,
            lng: 24.0728857
        },{
            lat: 49.7913957,
            lng: 24.0726783
        },{
            lat: 49.7927151,
            lng: 24.0720184
        },{
            lat: 49.7942907,
            lng: 24.0699424
        },{
            lat: 49.7953504,
            lng: 24.0708543
        },{
            lat: 49.7955805,
            lng: 24.0717142
        },{
            lat: 49.7959064,
            lng: 24.0717413
        },{
            lat: 49.7959552,
            lng: 24.071983
        },{
            lat: 49.7980268,
            lng: 24.069795
        },{
            lat: 49.7981773,
            lng: 24.0695226
        },{
            lat: 49.7989317,
            lng: 24.0685374
        },{
            lat: 49.7996029,
            lng: 24.066522
        },{
            lat: 49.8001699,
            lng: 24.0647228
        },{
            lat: 49.8006472,
            lng: 24.0650285
        },{
            lat: 49.8020397,
            lng: 24.06571
        },{
            lat: 49.8038716,
            lng: 24.064098
        },{
            lat: 49.8060356,
            lng: 24.062357
        },{
            lat: 49.806818,
            lng: 24.0610052
        },{
            lat: 49.8071849,
            lng: 24.0615845
        },{
            lat: 49.8091825,
            lng: 24.061102
        },{
            lat: 49.816689,
            lng: 24.0612898
        },{
            lat: 49.8206217,
            lng: 24.0617484
        },{
            lat: 49.821647,
            lng: 24.0577438
        },{
            lat: 49.8222769,
            lng: 24.0566279
        },{
            lat: 49.8228445,
            lng: 24.0557641
        },{
            lat: 49.8236751,
            lng: 24.0550507
        },{
            lat: 49.8250602,
            lng: 24.0541521
        },{
            lat: 49.8257671,
            lng: 24.0525994
        },{
            lat: 49.8283988,
            lng: 24.0474334
        },{
            lat: 49.829385,
            lng: 24.0449122
        },{
            lat: 49.831745,
            lng: 24.0420795
        },{
            lat: 49.8332225,
            lng: 24.0395529
        },{
            lat: 49.8337864,
            lng: 24.037391
        },{
            lat: 49.8339678,
            lng: 24.0364899
        },{
            lat: 49.8342145,
            lng: 24.0358138
        },{
            lat: 49.8346125,
            lng: 24.0351476
        },{
            lat: 49.8349057,
            lng: 24.0352106
        },{
            lat: 49.8373328,
            lng: 24.0352508
        },{
            lat: 49.8388518,
            lng: 24.0356315
        },{
            lat: 49.8397461,
            lng: 24.0361641
        },{
            lat: 49.8401907,
            lng: 24.0365569
        },{
            lat: 49.8408169,
            lng: 24.0369566
        },{
            lat: 49.8420278,
            lng: 24.0365328
        },{
            lat: 49.8430543,
            lng: 24.0363363
        },{
            lat: 49.8438318,
            lng: 24.0360862
        },{
            lat: 49.8443075,
            lng: 24.0357791
        },{
            lat: 49.8447053,
            lng: 24.0360875
        },{
            lat: 49.845072,
            lng: 24.0360606
        },{
            lat: 49.8449665,
            lng: 24.0354732
        },{
            lat: 49.8444321,
            lng: 24.0336413
        },{
            lat: 49.8447884,
            lng: 24.029559
        },{
            lat: 49.8447814,
            lng: 24.027145
        },{
            lat: 49.8442677,
            lng: 24.0250475
        },{
            lat: 49.843242,
            lng: 24.0231216
        },{
            lat: 49.8429756,
            lng: 24.0212226
        },{
            lat: 49.8449089,
            lng: 24.0201444
        },{
            lat: 49.8443238,
            lng: 24.0166629
        },{
            lat: 49.845964,
            lng: 24.0153272
        },{
            lat: 49.8464833,
            lng: 24.013219
        },{
            lat: 49.8478481,
            lng: 24.0096732
        },{
            lat: 49.8493095,
            lng: 24.008037
        },{
            lat: 49.8505581,
            lng: 24.0024258
        },{
            lat: 49.8480538,
            lng: 24.0005375
        },{
            lat: 49.8488961,
            lng: 23.9973617
        },{
            lat: 49.848417,
            lng: 23.9969326
        },{
            lat: 49.8480261,
            lng: 23.9962887
        },{
            lat: 49.8478065,
            lng: 23.9959643
        },{
            lat: 49.8475868,
            lng: 23.9959402
        },{
            lat: 49.8441518,
            lng: 23.9974153
        },{
            lat: 49.8407234,
            lng: 23.9993521
        },{
            lat: 49.839779,
            lng: 24.0001191
        },{
            lat: 49.8372465,
            lng: 24.0025278
        },{
            lat: 49.8368797,
            lng: 24.0020503
        },{
            lat: 49.835837,
            lng: 23.9965781
        },{
            lat: 49.8343372,
            lng: 23.9892717
        },{
            lat: 49.8323817,
            lng: 23.9782536
        },{
            lat: 49.8339032,
            lng: 23.9713428
        },{
            lat: 49.8342763,
            lng: 23.9682306
        },{
            lat: 49.8338742,
            lng: 23.9652043
        },{
            lat: 49.8312689,
            lng: 23.9564467
        }],

    create_map: function() {


        // Polygon getBounds extension - google-maps-extensions
        // https://github.com/tparkin/Google-Maps-Point-in-Polygon
        // http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
        if (!google.maps.Polygon.prototype.getBounds) {
            google.maps.Polygon.prototype.getBounds = function(latLng) {
                var bounds = new google.maps.LatLngBounds(),
                    paths = this.getPaths(),
                    path,
                    p, i;

                for (p = 0; p < paths.getLength(); p++) {
                    path = paths.getAt(p);
                    for (i = 0; i < path.getLength(); i++) {
                        bounds.extend(path.getAt(i));
                    }
                }

                return bounds;
            };
        }

        // Polygon containsLatLng - method to determine if a latLng is within a polygon
        google.maps.Polygon.prototype.containsLatLng = function(latLng) {
            // Exclude points outside of bounds as there is no way they are in the poly

            var inPoly = false,
                bounds, lat, lng,
                numPaths, p, path, numPoints,
                i, j, vertex1, vertex2;

            // Arguments are a pair of lat, lng variables
            if (arguments.length == 2) {
                if (
                    typeof arguments[0] == "number" &&
                    typeof arguments[1] == "number"
                ) {
                    lat = arguments[0];
                    lng = arguments[1];
                }
            } else if (arguments.length == 1) {
                bounds = this.getBounds();

                if (!bounds && !bounds.contains(latLng)) {
                    return false;
                }
                lat = latLng.lat();
                lng = latLng.lng();
            } else {
                console.log("Wrong number of inputs in google.maps.Polygon.prototype.contains.LatLng");
            }

            // Raycast point in polygon method

            numPaths = this.getPaths().getLength();
            for (p = 0; p < numPaths; p++) {
                path = this.getPaths().getAt(p);
                numPoints = path.getLength();
                j = numPoints - 1;

                for (i = 0; i < numPoints; i++) {
                    vertex1 = path.getAt(i);
                    vertex2 = path.getAt(j);

                    if (
                        vertex1.lng() < lng &&
                        vertex2.lng() >= lng ||
                        vertex2.lng() < lng &&
                        vertex1.lng() >= lng
                    ) {
                        if (
                            vertex1.lat() +
                            (lng - vertex1.lng()) /
                            (vertex2.lng() - vertex1.lng()) *
                            (vertex2.lat() - vertex1.lat()) <
                            lat
                        ) {
                            inPoly = !inPoly;
                        }
                    }

                    j = i;
                }
            }

            return inPoly;
        };

        map.model.bounds = new google.maps.LatLngBounds();
        var center = new google.maps.LatLng(49.83975999, 24.03863613);
        map.model.bounds.extend(center);

        
        map.model.pol_c = [];

        for (var i = 0; i < map.model.polygon_items.length; i++) {
            map.model.pol_c[map.model.pol_c.length] = map.model.polygon_items[i];

            var loc = new google.maps.LatLng(map.model.polygon_items[i].lat, map.model.polygon_items[i].lng);
            map.model.bounds.extend(loc);
        }

        map.model.pol_c[map.model.pol_c.length] = map.model.polygon_items[0];


        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 17,
            scrollwheel: false,
            streetViewControl: false,
            panControl: false,
            disableDefaultUI: true,
            panControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },

            // The latitude and longitude to center the map (always required)
            center: center, // New York

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles:

                [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 45
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "color": "#b4d4e1"
                }, {
                    "visibility": "on"
                }]
            }]
        };

        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('g_map');
        if(!this.map || $('#g_map').children().length == 0){

        	map.model.map_google = new google.maps.Map(mapElement, mapOptions);


	        map.model.map_google.fitBounds(map.model.bounds);

	        // Construct the polygon.
	        map.model.polygon = new google.maps.Polygon({
	            paths: map.model.pol_c,
	            strokeColor: '#10811a',
	            strokeOpacity: 0.8,
	            strokeWeight: 2,
	            fillColor: '#10811a',
	            fillOpacity: 0.2
	        });
	        map.model.polygon.setMap(map.model.map_google);

        	this.map = map.model.map_google;

        	this.polygon = map.model.polygon;
        }else{
        	map.model.map_google = this.map;
        	map.model.polygon = this.polygon;
        }




        map.model.geocoder = new google.maps.Geocoder();

        //    document.getElementById('submit').addEventListener('click', function() {

        // });

        // Sets the map on all markers in the array.
        // 
        // 
        // 

        google.maps.event.addListener(map.model.map_google, 'click', function(event) {
            map.model.place_marker(event.latLng, true);
        });

        google.maps.event.addListener(map.model.polygon, 'click', function(event) {
            map.model.place_marker(event.latLng, true);
        });






        var placeSearch;


        

        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        // function geolocate() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(function(position) {
        //             var geolocation = {
        //                 lat: position.coords.latitude,
        //                 lng: position.coords.longitude
        //             };
        //             var circle = new google.maps.Circle({
        //                 center: geolocation,
        //                 radius: position.coords.accuracy
        //             });
        //             map.model.autocomplete.setBounds(circle.getBounds());
        //         });
        //     }
        // }
        map.model.init_autocomplete();


    },
    a_listner:false,
    geocode_page:function(callback,callback_false){
            // Get the place details from the autocomplete object.
            var place = map.model.autocomplete.getPlace();

            var componentForm = {
                route: 'short_name'
            };
            if (if_defined(place) && if_defined(place.address_components)) {
                // Get each component of the address from the place details
                // and fill the corresponding field on the form.
                // 

                for (var component in componentForm) {
                    document.getElementById('str_auto').value = '';
                    document.getElementById('str_auto').disabled = false;
                }
                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        document.getElementById('str_auto').value = val;
                        $('#str_auto').closest('.inp-wrap').removeClass('error-input');
                        map.model.geocode_address(map.model.geocoder, map.model.map_google,callback,callback_false);
                    }
                }

                google.maps.event.removeListener(map.model.a_listner);
                

                map.model.autocomplete.set('place', null);
                map.model.a_listner = map.model.autocomplete.addListener('place_changed', map.model.geocode_page);
            } else {

                map.model.geocode_address(map.model.geocoder, map.model.map_google,callback,callback_false);


            }
    },
    markers:[],    
    place_marker:function(location, click,callback) {

        


            

            function setMapOnAll(map_google) {
                for (var i = 0; i < map.model.markers.length; i++) {
                    map.model.markers[i].setMap(map_google);
                }
            }


            // Removes the markers from the map, but keeps them in the array.
            function clearMarkers() {
                setMapOnAll(null);
            }
            function deleteMarkers() {
                clearMarkers();
                map.model.markers = [];
            }

            deleteMarkers();
            var marker = new google.maps.Marker({
                position: location,
                map: map.model.map_google
            });
            map.model.markers.push(marker);
            map.model.map_google.setCenter(location);
            if(map.model.map_google.getZoom()<14){

                map.model.map_google.setZoom(14);
            }
            if (click) {
                map.model.geocode_position(location);
            }

            if (!map.model.polygon.containsLatLng(location)) {

                var new_bounds = new google.maps.LatLngBounds();         
                for (var i = 0; i < map.model.polygon_items.length; i++) {
                    map.model.pol_c[map.model.pol_c.length] = map.model.polygon_items[i];

                    var loc = new google.maps.LatLng(map.model.polygon_items[i].lat, map.model.polygon_items[i].lng);
                    new_bounds.extend(loc);
                }

                new_bounds.extend(location)

                map.model.map_google.fitBounds(new_bounds);
                $('#g_map').closest('.inp-wrap').addClass('error-input').addClass('drag-input');


                setTimeout(function() {
                    $('#g_map').closest('.inp-wrap').removeClass('drag-input');

                }, 1000)
            }else{
                $('#g_map').closest('.inp-wrap').removeClass('error-input');
                if(callback){
                    callback();
                }

            }
        },    

    geocode_position:function(pos) {


        $('<div class="loading" id="map_loader"><div></div><p>Перевіряємо адресу</p></div>').appendTo('#loading_wrap');
        map.model.geocoder.geocode({
            latLng: pos
        }, function(responses) {
            $('#map_loader').remove();
            document.getElementById('str_auto').value = '';
            document.getElementById('str_auto').disabled = false;
            if(document.getElementById('house_auto')){

                document.getElementById('house_auto').value = '';
                document.getElementById('house_auto').disabled = false;
            }
            if (responses && responses.length > 0) {

                var route = false;
                var numb = false;

                for (var i = 0; i < responses[0].address_components.length; i++) {
                    if (responses[0].address_components[i].types[0] == "street_number") {

                        if (responses[0].address_components[i].short_name != 'Unnamed Road')
                            numb= responses[0].address_components[i].short_name
                    } else if (responses[0].address_components[i].types[0] == "route") {
                        if (responses[0].address_components[i].short_name != 'Unnamed Road')
                        route = responses[0].address_components[i].short_name;
                    }
                }
                    if(route){

                        if(numb){
                            if(document.getElementById('house_auto')){
                                document.getElementById('house_auto').value = numb;
                                document.getElementById('house_auto').closest('.inp-wrap').classList.remove('error-input');
                                document.getElementById('str_auto').value = route;
                                document.getElementById('str_auto').closest('.inp-wrap').classList.remove('error-input');
                            }else{

                                document.getElementById('str_auto').value = route+' '+numb;
                                
                                if(!document.getElementById('str_auto').closest('.inp-wrap')){
                                    document.getElementById('str_auto').classList.remove('error-input');

                                }else{
                                    document.getElementById('str_auto').closest('.inp-wrap').classList.remove('error-input');

                                }
                            }
                        }else{

                            document.getElementById('str_auto').value = route;
                            
                                if(!document.getElementById('str_auto').closest('.inp-wrap')){
                                    document.getElementById('str_auto').classList.remove('error-input');

                                }else{
                                    document.getElementById('str_auto').closest('.inp-wrap').classList.remove('error-input');

                                }
                        }

                    }else{

                    } 

                console.log('click position = ', responses[0]);
            } else {
                //updateMarkerAddress('Cannot determine address at this location.');
            }
        });
    }
    ,

    init_autocomplete:function() {
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            // 
        var bounds_def = new google.maps.LatLngBounds(
            new google.maps.LatLng(49.96981811, 23.89372815),
            new google.maps.LatLng(49.74574092, 24.16254986)
        );

        map.model.autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
            (document.getElementById('str_auto')), {
                bounds: map.model.bounds,
                types: ['geocode'],
                strictBounds: true
            });



        $('#str_auto,#house_auto').unbind('focus').focus(function() {
            $(this).closest('.inp-wrap').removeClass('error-input');
            //geolocate();
        });

        $('#str_auto,#house_auto').unbind('blur').blur(function() {
            //setTimeout(function() {
            //
            map.model.geocode_page(function(){
                //alert('good');
            });
                    //fillInAddress();
                //}, 400)
                //geolocate();
        });

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        map.model.a_listner = map.model.autocomplete.addListener('place_changed', map.model.geocode_page);
    },

    geocode_address:function(geocoder, resultsMap,callback,callback_false) {
        var address = document.getElementById('str_auto').value;

        if(document.getElementById('house_auto')){
            var str = document.getElementById('house_auto').value;

            var filtered_num = '';
            for (var i = 0; i < str.length; i++) {
                if (/[0-9]/.test(str[i])) {
                    filtered_num += str[i];
                }

            }
            str = filtered_num;
            document.getElementById('house_auto').value = str;
        }

        var bad = function(street_number){
            var str = 'empty';
            if(document.getElementById('house_auto')){
                str = document.getElementById('house_auto').value;

                var filtered_num = '';
                for (var i = 0; i < str.length; i++) {
                    if (/[0-9]/.test(str[i])) {
                        filtered_num += str[i];
                    }

                }
                str = filtered_num;
                document.getElementById('house_auto').value = str;
            }
            if(str.length>0&&!street_number){
                    $('#str_auto').closest('.inp-wrap').addClass('error-input').addClass('drag-input');
                    setTimeout(function() {
                        $('#str_auto').closest('.inp-wrap').removeClass('drag-input');
                    }, 1000);
            }else{
                if($('#str_auto').val().length>3 && !street_number){

                    $('#house_auto').closest('.inp-wrap').addClass('error-input').addClass('drag-input');
                    setTimeout(function() {
                        $('#house_auto').closest('.inp-wrap').removeClass('drag-input');
                    }, 1000);   
                }else{
                    if(street_number){

                        
                        $('#house_auto').closest('.inp-wrap').addClass('error-input').addClass('drag-input');
                        setTimeout(function() {
                            $('#house_auto').closest('.inp-wrap').removeClass('drag-input');
                        }, 1000);
                    }else{

                        $('#str_auto').closest('.inp-wrap').addClass('error-input').addClass('drag-input');
                        setTimeout(function() {
                            $('#str_auto').closest('.inp-wrap').removeClass('drag-input');
                        }, 1000);
                    }

                }                 
            }
            if(callback_false){
                callback_false();
            }
                    
        }
        var str = 'empty';
            if(document.getElementById('house_auto')){
                str= document.getElementById('house_auto').value;
            } 
        if(address.length>2 && str.length>0){
            address = 'Львів, '+address;
            if(document.getElementById('house_auto') && document.getElementById('house_auto').value.length>0){
                address+= ' ' + document.getElementById('house_auto').value;
            } 

            $('<div class="loading" id="map_loader"><div></div><p>Перевіряємо адресу</p></div>').appendTo('#loading_wrap');
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                console.log('geocode_results = ',results);
                $('#map_loader').remove();
                if (status === 'OK') {
                    if(!results||
                     results.length== 0 || 
                     results[0].address_components[0].long_name == 'Львів'){

                        bad();
                    }else if(results[0].address_components[0].types[0]!="street_number"){
                        //alert(results[0].address_components[0].types[0]);
                        if(results[0].address_components[0].types[0]=="political"){

                            bad();
                        }else{
                            bad(true);

                        }
                    }else{
                        
                        resultsMap.setCenter(results[0].geometry.location);
                        map.model.place_marker(results[0].geometry.location,callback);
                        $('#str_auto').closest('.inp-wrap').removeClass('error-input');
                        if(callback){
                            callback();
                        }
                    }
                } else {

                    bad();
                }
            });
        }else{

            bad();
        }
        
    }
};