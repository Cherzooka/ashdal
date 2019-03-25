characters.sort((a, b) => (a.name > b.name) ? 1 : -1)

window.onload = function () {
    var app = new Vue({
        el: '#app',
        components: {
            'carousel': VueCarousel.Carousel,
            'slide': VueCarousel.Slide,
        },
        data: {
            selectedcharacter: '',
            characters,


            // SHARED

            d4: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'> <path d='M96.187,73.923c-0.053-0.096-0.109-0.191-0.181-0.275L42.835,2.751c-0.14-0.194-0.321-0.49-0.539-0.621   c0,0,0-0.13-0.002-0.13c0,0,0,0-0.001,0c-0.062,0-0.127,0.056-0.194,0.027c-0.406-0.18-0.844-0.167-1.236-0.058   C40.86,1.97,40.86,2,40.86,2c-0.001,0-0.001,0-0.003,0c-0.092,0-0.18,0.009-0.265,0.047c0,0,0-0.047-0.002-0.047h-0.001   c-0.32,0-0.597,0.486-0.784,0.812c-0.023,0.035-0.042,0.118-0.062,0.16L4.289,73.901c-0.058,0.109-0.104,0.236-0.138,0.354   c-0.076,0.261-0.09,0.53-0.047,0.788c0.041,0.262,0.139,0.519,0.296,0.749c0.069,0.099,0.148,0.195,0.239,0.28l22.133,22.27   C27.035,98.614,27.385,99,27.787,99h0.002h0.001c0.018,0,0.036,0,0.055,0h0.002c0.002,0,0.002,0,0.002,0   c0.072,0,0.145-0.117,0.215-0.117c0.21,0,0.415-0.101,0.604-0.171L95.12,76.527c0.102-0.029,0.201-0.088,0.296-0.137   c0.194-0.103,0.368-0.246,0.513-0.401c0.177-0.197,0.304-0.431,0.381-0.675c0.078-0.251,0.106-0.521,0.071-0.789   C96.353,74.32,96.289,74.113,96.187,73.923z M26.784,93.108L8.09,74.41l29.912-59.828L26.784,93.108z M30.267,94.302L42.54,8.384   l49.094,65.46L30.267,94.302z'></path></svg>",
            d6: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'> <path d='M93.928,69.307C93.939,69.222,94,69.147,94,69.059V13.086c0-0.193-0.076-0.372-0.131-0.55  c-0.012-0.041-0.008-0.082-0.022-0.123c-0.004-0.011-0.022-0.015-0.026-0.026c-0.111-0.282-0.295-0.516-0.518-0.713  c-0.06-0.056-0.124-0.085-0.191-0.13c-0.186-0.126-0.39-0.215-0.614-0.271c-0.054-0.015-0.095-0.06-0.15-0.067L31.713,1.875  c-0.661-0.108-1.323,0.152-1.752,0.661c0,0-23.616,28.521-23.674,28.748C6.263,31.377,5.96,87.015,5.96,87.015  c0,0.94,0.227,1.738,1.153,1.88c0,0,63.057,9.283,63.086,9.246l23.319-27.924c0.059-0.07,0.079-0.126,0.126-0.204  c0.068-0.111,0.151-0.202,0.196-0.328C93.889,69.558,93.908,69.44,93.928,69.307z M32.195,5.797l56.246,8.655L67.963,39.029  l-56.249-8.651L32.195,5.797z M10,33.962l57,8.741v52.125l-57-8.741V33.962z M71,41.763l19-23.421v50.025L71,91.792V41.763z'></path></svg>",
            d8: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'> <path d='M86.495,12.829c-0.008-0.225-0.056-0.451-0.146-0.665c-0.056-0.133-0.124-0.26-0.206-0.374   c-0.189-0.271-0.436-0.481-0.714-0.623c-0.178-0.092-0.373-0.157-0.577-0.187c-0.042-0.008-0.086-0.016-0.128-0.019L10.25,3.175   C9.956,3.129,9.849,3.146,9.837,3.154C9.371,3.33,8.607,4.966,8.635,5.271l4.858,82.267c0.008,0.164-0.024,0.328,0.021,0.48   c0.065,0.222,0.141,0.425,0.272,0.604c0.197,0.268,0.445,0.485,0.76,0.627c0.13,0.057,0.256,0.103,0.4,0.134   c0.074,0.015,0.146,0.026,0.22,0.03l74.119,7.786c0.08,0.012,0.155-0.07,0.236-0.07C89.652,97.125,89.79,97,89.924,97l0,0h0.002   c0.422,0,0.817,0,1.109,0c0,0,0,0,0.002,0c0.032-1,0.063-0.334,0.094-0.375c0.264-0.379,0.374-0.942,0.346-1.374L86.495,12.829z    M78.504,14.242L27.339,44.828L13.295,7.391L78.504,14.242z M13.089,17.977l11.188,29.822l-7.701,27.84L13.089,17.977z    M17.832,85.762l9.618-34.767l55.258,41.584L17.832,85.762z M29.831,47.894l52.954-31.655l4.533,74.911L29.831,47.894z'></path></svg>",
            d10: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'> <path d='M97.128,65.893L71.195,3.047c-0.333-0.804-1.223-1.232-2.057-0.969L20.974,16.962c-0.194,0.059-0.375,0.155-0.537,0.28   L3.674,30.255c-0.737,0.362-1.089,1.186-0.863,1.967c0.006,0.026-0.008,0.05,0,0.076c0.003,0.013,0.018,0.02,0.021,0.033   c0.01,0.023,0.005,0.049,0.015,0.073l26.48,63.768c0.188,0.451,0.57,0.715,0.992,0.873c0.119,0.053,0.244,0.083,0.373,0.109   c0.069,0.01,0.125,0.059,0.194,0.059c0.02,0,0.036-0.01,0.053-0.01c0.033,0,0.059,0.017,0.092,0.017   c0.046,0,0.092-0.003,0.138-0.007c0.05-0.003,0.089-0.029,0.135-0.039c0.083-0.014,0.165-0.01,0.244-0.036l50.317-15.557   c0.032-0.01,0.056-0.036,0.089-0.046c0.25-0.076,0.494-0.185,0.698-0.38l14.08-13.397C97.237,67.276,97.396,66.535,97.128,65.893z    M10.1,33.906l16.506,27.558l1.928,23.999L7.032,33.686L10.1,33.906z M30.065,62.456l28.242,0.243   C58.519,62.863,58.759,63,59.043,63c0.003,0,0.006,0,0.006,0l19.004,16.174L32.546,93.272L30.065,62.456z M57.995,59.371   l-28.892-0.3L13.688,33.33L67.399,6.8L57.995,59.371z M22.262,20.096l28.315-8.752l-39.133,19.33   c-0.079-0.017-0.145-0.066-0.228-0.073L8.94,30.439L22.262,20.096z M81.424,77.666L61.218,60.521l9.084-50.795L93.569,66.11   L81.424,77.666z'></path></svg>",
            d12: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'> <path d='M44.258,97.516c-0.052,0-0.134,0.009-0.146-0.007h-0.003h-0.003l0,0c-0.18-0.018-0.36-0.066-0.527-0.149l0,0   c-0.006-0.003-0.009-0.006-0.015-0.009l0,0h-0.003l-22.98-11.488c-0.274-0.138-0.503-0.354-0.659-0.623L4.604,58.435   c-0.177-0.314-0.238-0.668-0.189-1.003l3.828-26.803c0.042-0.287,0.162-0.559,0.348-0.781L27.733,6.882   c0.034-0.045,0.073-0.085,0.113-0.125l0,0l0.003-0.003c0,0,0,0,0.003-0.003c0,0-0.003,0.003,0.006-0.006l0,0   c0.003,0,0.003-0.003,0.003-0.003s0,0,0.003,0c0.049-0.049,0.101-0.091,0.156-0.131c0.003-0.003,0.003-0.003,0.003-0.003   s0.003,0,0.003-0.003c0,0,0,0,0.003,0c0,0,0,0,0.003-0.003c0,0,0,0,0.003-0.003c0,0,0,0,0.003,0c0,0,0-0.003,0.003-0.003l0,0   c0.162-0.113,0.345-0.198,0.543-0.244l0,0c0.003,0,0.003,0,0.006,0h0.003c0.003-0.003,0.003-0.003,0.003-0.003s0.003,0,0.006,0l0,0   c0.04-0.009,0.079-0.015,0.122-0.021l26.802-3.831c0.244-0.034,0.488-0.009,0.714,0.064l22.975,7.661   c0.345,0.113,0.652,0.351,0.851,0.686c0.006,0.009,0.013,0.016,0.016,0.024l15.316,26.802c0.167,0.293,0.234,0.634,0.191,0.97   l-3.83,30.636l0,0c0,0.003,0,0.003,0,0.003c0,0.003,0,0.003,0,0.003v0.003c-0.003,0.004-0.003,0.007-0.003,0.007v0.003   c0,0,0,0,0,0.003l0,0c0,0.003,0,0.003,0,0.006l0,0c-0.034,0.229-0.116,0.442-0.238,0.632l0,0c-0.006,0.006-0.009,0.012-0.012,0.015   c0,0,0,0,0,0.003c0,0-0.004,0-0.004,0.003l0,0c-0.003,0.004-0.003,0.004-0.003,0.007h-0.003c0,0.003,0,0.003,0,0.003   c0,0.003-0.003,0.003-0.003,0.003v0.003H91.49c0,0.003-0.003,0.006-0.003,0.009l0,0c0,0-0.003,0-0.003,0.004l0,0   c-0.003,0-0.003,0.003-0.003,0.003s-0.007,0.006-0.01,0.012l0,0c0,0.003,0,0.003-0.003,0.003v0.003   c-0.003,0.004-0.006,0.007-0.009,0.01l0,0c0,0.003-0.007,0.006-0.003,0.006c-0.016,0.021-0.034,0.043-0.049,0.064L72.261,93.124   c-0.247,0.295-0.595,0.49-0.979,0.546L44.483,97.5c-0.019,0-0.037,0.003-0.055,0.006h-0.003c0,0,0,0-0.003,0h-0.003h-0.003h-0.003   c-0.003,0.003-0.003,0.003-0.003,0.003s-0.003,0-0.006,0l0,0C44.355,97.513,44.307,97.516,44.258,97.516z M45.819,66.349v27.806   l24.429-3.492l17.741-21.294L70.821,55.632L45.819,66.349z M22.399,83.278l20.297,10.15V66.05L21.225,48.159L8.001,58.081   L22.399,83.278z M72.472,52.954l16.533,13.23l3.422-27.352L78.102,13.763l-12.907,6.45L72.472,52.954z M23.226,45.759   l21.297,17.748L69.26,52.905l-7.146-32.149l-24.624-3.52L23.226,45.759z M11.271,31.507l-3.23,22.643l12.004-9.01l14.651-29.3   l-5.654-5.654L11.271,31.507z M37.332,14.059l25.81,3.69l11.511-5.755l-19.05-6.353L32.25,8.978L37.332,14.059z'></path></svg>",
            d20: "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 100 100' xml:space='preserve'> <path d='M80.644,87.982l16.592-41.483c0.054-0.128,0.088-0.26,0.108-0.394c0.006-0.039,0.007-0.077,0.011-0.116  c0.007-0.087,0.008-0.174,0.002-0.26c-0.003-0.046-0.007-0.091-0.014-0.137c-0.014-0.089-0.036-0.176-0.063-0.262  c-0.012-0.034-0.019-0.069-0.031-0.103c-0.047-0.118-0.106-0.229-0.178-0.335c-0.004-0.006-0.006-0.012-0.01-0.018L67.999,3.358  c-0.01-0.013-0.003-0.026-0.013-0.04L68,3.315V4c0,0-0.033,0-0.037,0c-0.403-1-1.094-1.124-1.752-0.976  c0,0.004-0.004-0.012-0.007-0.012C66.201,3.016,66.194,3,66.194,3H66.19h-0.003h-0.003h-0.004h-0.003c0,0-0.004,0-0.007,0  s-0.003-0.151-0.007-0.151L20.495,15.227c-0.025,0.007-0.046-0.019-0.071-0.011c-0.087,0.028-0.172,0.041-0.253,0.083  c-0.054,0.027-0.102,0.053-0.152,0.085c-0.051,0.033-0.101,0.061-0.147,0.099c-0.044,0.036-0.084,0.073-0.124,0.113  c-0.048,0.048-0.093,0.098-0.136,0.152c-0.03,0.039-0.059,0.076-0.085,0.117c-0.046,0.07-0.084,0.145-0.12,0.223  c-0.011,0.023-0.027,0.042-0.036,0.066L2.911,57.664C2.891,57.715,3,57.768,3,57.82v0.002c0,0.186,0,0.375,0,0.562  c0,0.004,0,0.004,0,0.008c0,0,0,0,0,0.002c0,0,0,0,0,0.004v0.004v0.002c0,0.074-0.002,0.15,0.012,0.223  C3.015,58.631,3,58.631,3,58.633c0,0.004,0,0.004,0,0.008c0,0,0,0,0,0.002c0,0,0,0,0,0.004v0.004c0,0,0,0,0,0.002v0.004  c0,0.191-0.046,0.377,0.06,0.545c0-0.002-0.03,0.004-0.03,0.004c0,0.004-0.03,0.004-0.03,0.004c0,0.002,0,0.002,0,0.002  l-0.045,0.004c0.03,0.047,0.036,0.09,0.068,0.133l29.049,37.359c0.002,0.004,0,0.006,0.002,0.01c0.002,0.002,0,0.004,0.002,0.008  c0.006,0.008,0.014,0.014,0.021,0.021c0.024,0.029,0.052,0.051,0.078,0.078c0.027,0.029,0.053,0.057,0.082,0.082  c0.03,0.027,0.055,0.062,0.086,0.088c0.026,0.02,0.057,0.033,0.084,0.053c0.04,0.027,0.081,0.053,0.123,0.076  c0.005,0.004,0.01,0.008,0.016,0.01c0.087,0.051,0.176,0.09,0.269,0.123c0.042,0.014,0.082,0.031,0.125,0.043  c0.021,0.006,0.041,0.018,0.062,0.021c0.123,0.027,0.249,0.043,0.375,0.043c0.099,0,0.202-0.012,0.304-0.027l45.669-8.303  c0.057-0.01,0.108-0.021,0.163-0.037C79.547,88.992,79.562,89,79.575,89c0.004,0,0.004,0,0.004,0c0.021,0,0.039-0.027,0.06-0.035  c0.041-0.014,0.08-0.034,0.12-0.052c0.021-0.01,0.044-0.019,0.064-0.03c0.017-0.01,0.026-0.015,0.033-0.017  c0.014-0.008,0.023-0.021,0.037-0.028c0.14-0.078,0.269-0.174,0.38-0.285c0.014-0.016,0.024-0.034,0.038-0.048  c0.109-0.119,0.201-0.252,0.271-0.398c0.006-0.01,0.016-0.018,0.021-0.029c0.004-0.008,0.008-0.017,0.011-0.026  c0.002-0.004,0.003-0.006,0.005-0.01C80.627,88.021,80.635,88.002,80.644,87.982z M77.611,84.461L48.805,66.453l32.407-25.202  L77.611,84.461z M46.817,63.709L35.863,23.542l43.818,14.608L46.817,63.709z M84.668,40.542l8.926,5.952l-11.902,29.75  L84.668,40.542z M89.128,39.446L84.53,36.38l-6.129-12.257L89.128,39.446z M79.876,34.645L37.807,20.622L65.854,6.599L79.876,34.645  z M33.268,19.107l-6.485-2.162l23.781-6.487L33.268,19.107z M21.92,18.895l8.67,2.891L10.357,47.798L21.92,18.895z M32.652,24.649  l10.845,39.757L7.351,57.178L32.652,24.649z M43.472,67.857L32.969,92.363L8.462,60.855L43.472,67.857z M46.631,69.09l27.826,17.393  l-38.263,6.959L46.631,69.09z'></path></svg>",


        },

        computed: {
            
            displayprofile: function() {
                if (this.selectedcharacter != '') {
                    return false
                } else {
                    return true
                }
            },
            
            level: function () {
                if (this.multiclass == true) {
                    return this.class1level + this.class2level
                } else {
                    return this.class1level
                }

            },
            personalcolor: function () {
                return "hsl(" + this.color + ")"
            },
            circlecolor: function () {
                return "hsla(" + this.color + ", .7)"
            },
            levelTag: function () {
                if (this.level <= 1) {
                    return "st"
                } else {
                    if (this.level <= 2) {
                        return "nd"
                    } else {
                        if (this.level <= 3) {
                            return "rd"
                        } else {
                            return "th"
                        }
                    }
                }
            },
            proficiency: function () {
                if (this.level >= 17) {
                    return 6
                } else {
                    if (this.level >= 13) {
                        return 5
                    } else {
                        if (this.level >= 9) {
                            return 4
                        } else {
                            if (this.level >= 5) {
                                return 3
                            } else {
                                return 2
                            }
                        }
                    }
                }
            },
            athletics: function () {
                if (this.proficiencies.includes('Athletics')) {
                    return this.proficiency + this.strengthMod
                } else {
                    return this.strengthMod
                }
            },
            athleticsProf: function () {
                if (this.proficiencies.includes('Athletics')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            acrobatics: function () {
                if (this.proficiencies.includes('Acrobatics')) {
                    return this.proficiency + this.dexterityMod
                } else {
                    return this.dexterityMod
                }
            },
            acrobaticsProf: function () {
                if (this.proficiencies.includes('Acrobatics')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            sleightofhand: function () {
                if (this.proficiencies.includes('Sleight of Hand')) {
                    return this.proficiency + this.dexterityMod
                } else {
                    return this.dexterityMod
                }
            },
            sleightofhandProf: function () {
                if (this.proficiencies.includes('Sleight of Hand')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            stealth: function () {
                if (this.proficiencies.includes('Stealth')) {
                    return this.proficiency + this.dexterityMod
                } else {
                    return this.dexterityMod
                }
            },
            stealthProf: function () {
                if (this.proficiencies.includes('Stealth')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            arcana: function () {
                if (this.proficiencies.includes('Arcana')) {
                    return this.proficiency + this.intelligenceMod
                } else {
                    return this.intelligenceMod
                }
            },
            arcanaProf: function () {
                if (this.proficiencies.includes('Arcana')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            arcanaPassive: function () {
                return 10 + this.arcana
            },
            investigation: function () {
                if (this.proficiencies.includes('Investigation')) {
                    return this.proficiency + this.intelligenceMod
                } else {
                    return this.intelligenceMod
                }
            },
            investigationProf: function () {
                if (this.proficiencies.includes('Investigation')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            history: function () {
                if (this.proficiencies.includes('History')) {
                    return this.proficiency + this.intelligenceMod
                } else {
                    return this.intelligenceMod
                }
            },
            historyProf: function () {
                if (this.proficiencies.includes('History')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            historyPassive: function () {
                return 10 + this.history
            },
            nature: function () {
                if (this.proficiencies.includes('Nature')) {
                    return this.proficiency + this.intelligenceMod
                } else {
                    return this.intelligenceMod
                }
            },
            natureProf: function () {
                if (this.proficiencies.includes('Nature')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            naturePassive: function () {
                return 10 + this.nature
            },
            religion: function () {
                if (this.proficiencies.includes('Religion')) {
                    return this.proficiency + this.intelligenceMod
                } else {
                    return this.intelligenceMod
                }
            },
            religionProf: function () {
                if (this.proficiencies.includes('Religion')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            religionPassive: function () {
                return 10 + this.religion
            },
            animalhandling: function () {
                if (this.proficiencies.includes('Animal Handling')) {
                    return this.proficiency + this.wisdomMod
                } else {
                    return this.wisdomMod
                }
            },
            animalhandlingProf: function () {
                if (this.proficiencies.includes('Animal Handling')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            insight: function () {
                if (this.proficiencies.includes('Insight')) {
                    return this.proficiency + this.wisdomMod
                } else {
                    return this.wisdomMod
                }
            },
            insightProf: function () {
                if (this.proficiencies.includes('Insight')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            medicine: function () {
                if (this.proficiencies.includes('Medicine')) {
                    return this.proficiency + this.wisdomMod
                } else {
                    return this.wisdomMod
                }
            },
            medicineProf: function () {
                if (this.proficiencies.includes('Medicine')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            medicinePassive: function () {
                return 10 + this.medicine
            },
            perception: function () {
                if (this.proficiencies.includes('Perception')) {
                    if (this.rhysCaernbonus === true) {
                        return this.proficiency + this.wisdomMod + this.charismaMod
                    } else {
                        return this.proficiency + this.wisdomMod
                    }
                } else {
                    return this.wisdomMod
                }
            },
            perceptionProf: function () {
                if (this.proficiencies.includes('Perception')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            perceptionPassive: function () {
                return 10 + this.perception
            },
            survival: function () {
                if (this.proficiencies.includes('Survival')) {
                    return this.proficiency + this.wisdomMod
                } else {
                    return this.wisdomMod
                }
            },
            survivalProf: function () {
                if (this.proficiencies.includes('Survival')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            survivalPassive: function () {
                return 10 + this.survival
            },
            deception: function () {
                if (this.proficiencies.includes('Deception')) {
                    return this.proficiency + this.charismaMod
                } else {
                    return this.charismaMod
                }
            },
            deceptionProf: function () {
                if (this.proficiencies.includes('Deception')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            intimidation: function () {
                if (this.proficiencies.includes('Intimidation')) {
                    return this.proficiency + this.charismaMod
                } else {
                    return this.charismaMod
                }
            },
            intimidationProf: function () {
                if (this.proficiencies.includes('Intimidation')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            performance: function () {
                if (this.proficiencies.includes('Performance')) {
                    return this.proficiency + this.charismaMod
                } else {
                    return this.charismaMod
                }
            },
            performanceProf: function () {
                if (this.proficiencies.includes('Performance')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            persuasion: function () {
                if (this.proficiencies.includes('Persuasion')) {
                    return this.proficiency + this.charismaMod
                } else {
                    return this.charismaMod
                }
            },
            persuasionProf: function () {
                if (this.proficiencies.includes('Persuasion')) {
                    return "fas"
                } else {
                    return "far"
                }
            },
            AC: function () {
                if (this.unarmoredbonus == true) {
                    return 13 + this.dexterityMod
                } else {
                    return 10 + this.dexterityMod
                }
            },
            initiative: function () {
                if (this.dexterityMod >= 1) {
                    return "+" + this.dexterityMod
                } else {
                    return this.dexterityMod
                }
            },

            hitdie1: function () {
                if (this.class1.includes('Barbarian')) {
                    return this.d12
                } else {
                    if (this.class1.includes('Fighter') || this.class1.includes('Paladin') || this.class1.includes('Ranger')) {
                        return this.d10
                    } else {
                        if (this.class1.includes('Bard') || this.class1.includes('Cleric') || this.class1.includes('Druid') || this.class1.includes('Monk') || this.class1.includes('Rogue') || this.class1.includes('Warlock')) {
                            return this.d8
                        } else {
                            return this.d6
                        }
                    }
                }
            },
            hitdie2: function () {
                if (this.class2.includes('Barbarian')) {
                    return this.d12
                } else {
                    if (this.class2.includes('Fighter') || this.class2.includes('Paladin') || this.class2.includes('Ranger')) {
                        return this.d10
                    } else {
                        if (this.class2.includes('Bard') || this.class2.includes('Cleric') || this.class2.includes('Druid') || this.class2.includes('Monk') || this.class2.includes('Rogue') || this.class2.includes('Warlock')) {
                            return this.d8
                        } else {
                            return this.d6
                        }
                    }
                }
            },
            strsaveprof: function () {
                if (this.class1.includes('Barbarian') || this.class1.includes('Fighter') || this.class1.includes('Monk') || this.class1.includes('Ranger')) {
                    return 1
                } else {
                    return 0
                }
            },
            dexsaveprof: function () {
                if (this.class1.includes('Bard') || this.class1.includes('Monk') || this.class1.includes('Ranger') || this.class1.includes('Rogue')) {
                    return 1
                } else {
                    return 0
                }
            },
            consaveprof: function () {
                if (this.class1.includes('Barbarian') || this.class1.includes('Fighter') || this.class1.includes('Sorcerer')) {
                    return 1
                } else {
                    return 0
                }
            },
            intsaveprof: function () {
                if (this.class1.includes('Druid') || this.class1.includes('Rogue') || this.class1.includes('Wizard')) {
                    return 1
                } else {
                    return 0
                }
            },
            wissaveprof: function () {
                if (this.class1.includes('Cleric') || this.class1.includes('Druid') || this.class1.includes('Paladin') || this.class1.includes('Warlock') || this.class1.includes('Wizard')) {
                    return 1
                } else {
                    return 0
                }
            },
            chasaveprof: function () {
                if (this.class1.includes('Bard') || this.class1.includes('Cleric') || this.class1.includes('Paladin') || this.class1.includes('Sorcerer') || this.class1.includes('Warlock')) {
                    return 1
                } else {
                    return 0
                }
            },
            circle: function () {
                return "100 " + this.circlestrength + this.circledexterity + this.circleconstitution + "100 " + this.circleintelligence + this.circlewisdom + this.circlecharisma
            },
            circlestrengthmod: function () {
                if (this.strengthMod >= 1) {
                    return "+"
                } else {
                    return ""
                }
            },
            circledexteritymod: function () {
                if (this.dexterityMod >= 1) {
                    return "+"
                } else {
                    return ""
                }
            },
            circleconstitutionmod: function () {
                if (this.constitutionMod >= 1) {
                    return "+"
                } else {
                    return ""
                }
            },
            circleintelligencemod: function () {
                if (this.intelligenceMod >= 1) {
                    return "+"
                } else {
                    return ""
                }
            },
            circlewisdommod: function () {
                if (this.wisdomMod >= 1) {
                    return "+"
                } else {
                    return ""
                }
            },
            circlecharismamod: function () {
                if (this.charismaMod >= 1) {
                    return "+"
                } else {
                    return ""
                }
            },
            circlestrength: function () {
                if (this.strength >= 20) {
                    return "0 "
                } else {
                    if (this.strength >= 19) {
                        return "5 "
                    } else {
                        if (this.strength >= 18) {
                            return "10 "
                        } else {
                            if (this.strength >= 17) {
                                return "15 "
                            } else {
                                if (this.strength >= 16) {
                                    return "20 "
                                } else {
                                    if (this.strength >= 15) {
                                        return "25 "
                                    } else {
                                        if (this.strength >= 14) {
                                            return "30 "
                                        } else {
                                            if (this.strength >= 13) {
                                                return "35 "
                                            } else {
                                                if (this.strength >= 12) {
                                                    return "40 "
                                                } else {
                                                    if (this.strength >= 11) {
                                                        return "45 "
                                                    } else {
                                                        if (this.strength >= 10) {
                                                            return "50 "
                                                        } else {
                                                            if (this.strength >= 9) {
                                                                return "55 "
                                                            } else {
                                                                if (this.strength >= 8) {
                                                                    return "60 "
                                                                } else {
                                                                    if (this.strength >= 7) {
                                                                        return "65 "
                                                                    } else {
                                                                        if (this.strength >= 6) {
                                                                            return "70 "
                                                                        } else {
                                                                            if (this.strength >= 5) {
                                                                                return "75 "
                                                                            } else {
                                                                                if (this.strength >= 4) {
                                                                                    return "80 "
                                                                                } else {
                                                                                    if (this.strength >= 3) {
                                                                                        return "85 "
                                                                                    } else {
                                                                                        if (this.strength >= 2) {
                                                                                            return "90 "
                                                                                        } else {
                                                                                            if (this.strength >= 1) {
                                                                                                return "95 "
                                                                                            } else {
                                                                                                return "100 "
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            circledexterity: function () {
                if (this.dexterity >= 20) {
                    return "186.603 50 "
                } else {
                    if (this.dexterity >= 19) {
                        return "182.272 52.5 "
                    } else {
                        if (this.dexterity >= 18) {
                            return "177.942 55 "
                        } else {
                            if (this.dexterity >= 17) {
                                return "173.612 57.5 "
                            } else {
                                if (this.dexterity >= 16) {
                                    return "169.282 60 "
                                } else {
                                    if (this.dexterity >= 15) {
                                        return "164.952 62.5 "
                                    } else {
                                        if (this.dexterity >= 14) {
                                            return "160.622 65 "
                                        } else {
                                            if (this.dexterity >= 13) {
                                                return "156.292 67.5 "
                                            } else {
                                                if (this.dexterity >= 12) {
                                                    return "151.962 70 "
                                                } else {
                                                    if (this.dexterity >= 11) {
                                                        return "147.631 72.5 "
                                                    } else {
                                                        if (this.dexterity >= 10) {
                                                            return "143.301 75 "
                                                        } else {
                                                            if (this.dexterity >= 9) {
                                                                return "138.971 77.5 "
                                                            } else {
                                                                if (this.dexterity >= 8) {
                                                                    return "134.641 80 "
                                                                } else {
                                                                    if (this.dexterity >= 7) {
                                                                        return "130.311 82.5 "
                                                                    } else {
                                                                        if (this.dexterity >= 6) {
                                                                            return "125.981 85 "
                                                                        } else {
                                                                            if (this.dexterity >= 5) {
                                                                                return "121.651 87.5 "
                                                                            } else {
                                                                                if (this.dexterity >= 4) {
                                                                                    return "117.321 90 "
                                                                                } else {
                                                                                    if (this.dexterity >= 3) {
                                                                                        return "112.99 92.5 "
                                                                                    } else {
                                                                                        if (this.dexterity >= 2) {
                                                                                            return "108.66 95 "
                                                                                        } else {
                                                                                            if (this.dexterity >= 1) {
                                                                                                return "104.33 97.5 "
                                                                                            } else {
                                                                                                return "100 100 "
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            circleconstitution: function () {
                if (this.constitution >= 20) {
                    return "186.603 150 "
                } else {
                    if (this.constitution >= 19) {
                        return "182.272 147.5 "
                    } else {
                        if (this.constitution >= 18) {
                            return "177.942 145 "
                        } else {
                            if (this.constitution >= 17) {
                                return "173.612 142.5 "
                            } else {
                                if (this.constitution >= 16) {
                                    return "169.282 140 "
                                } else {
                                    if (this.constitution >= 15) {
                                        return "164.952 137.5 "
                                    } else {
                                        if (this.constitution >= 14) {
                                            return "160.622 135 "
                                        } else {
                                            if (this.constitution >= 13) {
                                                return "156.292 132.5 "
                                            } else {
                                                if (this.constitution >= 12) {
                                                    return "151.962 130 "
                                                } else {
                                                    if (this.constitution >= 11) {
                                                        return "147.631 127.5 "
                                                    } else {
                                                        if (this.constitution >= 10) {
                                                            return "143.301 125 "
                                                        } else {
                                                            if (this.constitution >= 9) {
                                                                return "138.971 122.5 "
                                                            } else {
                                                                if (this.constitution >= 8) {
                                                                    return "134.641 120 "
                                                                } else {
                                                                    if (this.constitution >= 7) {
                                                                        return "130.311 117.5 "
                                                                    } else {
                                                                        if (this.constitution >= 6) {
                                                                            return "125.981 115 "
                                                                        } else {
                                                                            if (this.constitution >= 5) {
                                                                                return "121.651 112.5 "
                                                                            } else {
                                                                                if (this.constitution >= 4) {
                                                                                    return "117.321 110 "
                                                                                } else {
                                                                                    if (this.constitution >= 3) {
                                                                                        return "112.99 107.5 "
                                                                                    } else {
                                                                                        if (this.constitution >= 2) {
                                                                                            return "108.66 105 "
                                                                                        } else {
                                                                                            if (this.constitution >= 1) {
                                                                                                return "104.33 102.5 "
                                                                                            } else {
                                                                                                return "100 100 "
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            circleintelligence: function () {
                if (this.intelligence >= 20) {
                    return "200 "
                } else {
                    if (this.intelligence >= 19) {
                        return "195 "
                    } else {
                        if (this.intelligence >= 18) {
                            return "190 "
                        } else {
                            if (this.intelligence >= 17) {
                                return "185 "
                            } else {
                                if (this.intelligence >= 16) {
                                    return "180 "
                                } else {
                                    if (this.intelligence >= 15) {
                                        return "175 "
                                    } else {
                                        if (this.intelligence >= 14) {
                                            return "170 "
                                        } else {
                                            if (this.intelligence >= 13) {
                                                return "165 "
                                            } else {
                                                if (this.intelligence >= 12) {
                                                    return "160 "
                                                } else {
                                                    if (this.intelligence >= 11) {
                                                        return "155 "
                                                    } else {
                                                        if (this.intelligence >= 10) {
                                                            return "150 "
                                                        } else {
                                                            if (this.intelligence >= 9) {
                                                                return "145 "
                                                            } else {
                                                                if (this.intelligence >= 8) {
                                                                    return "140 "
                                                                } else {
                                                                    if (this.intelligence >= 7) {
                                                                        return "135 "
                                                                    } else {
                                                                        if (this.intelligence >= 6) {
                                                                            return "130 "
                                                                        } else {
                                                                            if (this.intelligence >= 5) {
                                                                                return "125 "
                                                                            } else {
                                                                                if (this.intelligence >= 4) {
                                                                                    return "120 "
                                                                                } else {
                                                                                    if (this.intelligence >= 3) {
                                                                                        return "115 "
                                                                                    } else {
                                                                                        if (this.intelligence >= 2) {
                                                                                            return "110 "
                                                                                        } else {
                                                                                            if (this.intelligence >= 1) {
                                                                                                return "105 "
                                                                                            } else {
                                                                                                return "100 "
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            circlewisdom: function () {
                if (this.wisdom >= 20) {
                    return "13.3975 150 "
                } else {
                    if (this.wisdom >= 19) {
                        return "17.7276 147.5 "
                    } else {
                        if (this.wisdom >= 18) {
                            return "22.0577 145 "
                        } else {
                            if (this.wisdom >= 17) {
                                return "26.3878 142.5 "
                            } else {
                                if (this.wisdom >= 16) {
                                    return "30.718 140 "
                                } else {
                                    if (this.wisdom >= 15) {
                                        return "35.0481 137.5 "
                                    } else {
                                        if (this.wisdom >= 14) {
                                            return "39.3782 135 "
                                        } else {
                                            if (this.wisdom >= 13) {
                                                return "43.7083 132.5 "
                                            } else {
                                                if (this.wisdom >= 12) {
                                                    return "48.0385 130 "
                                                } else {
                                                    if (this.wisdom >= 11) {
                                                        return "52.3686 127.5 "
                                                    } else {
                                                        if (this.wisdom >= 10) {
                                                            return "56.6987 125 "
                                                        } else {
                                                            if (this.wisdom >= 9) {
                                                                return "61.0289 122.5 "
                                                            } else {
                                                                if (this.wisdom >= 8) {
                                                                    return "65.359 120 "
                                                                } else {
                                                                    if (this.wisdom >= 7) {
                                                                        return "69.6891 117.5 "
                                                                    } else {
                                                                        if (this.wisdom >= 6) {
                                                                            return "74.0192 115 "
                                                                        } else {
                                                                            if (this.wisdom >= 5) {
                                                                                return "78.3494 112.5 "
                                                                            } else {
                                                                                if (this.wisdom >= 4) {
                                                                                    return "82.6795 110 "
                                                                                } else {
                                                                                    if (this.wisdom >= 3) {
                                                                                        return "87.0096 107.5 "
                                                                                    } else {
                                                                                        if (this.wisdom >= 2) {
                                                                                            return "91.3397 105 "
                                                                                        } else {
                                                                                            if (this.wisdom >= 1) {
                                                                                                return "95.6699 102.5 "
                                                                                            } else {
                                                                                                return "100 100 "
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            circlecharisma: function () {
                if (this.charisma >= 20) {
                    return "13.3975 50"
                } else {
                    if (this.charisma >= 19) {
                        return "17.7276 52.5"
                    } else {
                        if (this.charisma >= 18) {
                            return "22.0577 55"
                        } else {
                            if (this.charisma >= 17) {
                                return "26.3878 " + "57.5 "
                            } else {
                                if (this.charisma >= 16) {
                                    return "30.718 60"
                                } else {
                                    if (this.charisma >= 15) {
                                        return "35.0481 62.5"
                                    } else {
                                        if (this.charisma >= 14) {
                                            return "39.3782 65"
                                        } else {
                                            if (this.charisma >= 13) {
                                                return "43.7083 67.5"
                                            } else {
                                                if (this.charisma >= 12) {
                                                    return "48.0385 70"
                                                } else {
                                                    if (this.charisma >= 11) {
                                                        return "52.3686 72.5"
                                                    } else {
                                                        if (this.charisma >= 10) {
                                                            return "56.6987 75"
                                                        } else {
                                                            if (this.charisma >= 9) {
                                                                return "61.0289 77.5"
                                                            } else {
                                                                if (this.charisma >= 8) {
                                                                    return "65.359 80"
                                                                } else {
                                                                    if (this.charisma >= 7) {
                                                                        return "69.6891 82.5"
                                                                    } else {
                                                                        if (this.charisma >= 6) {
                                                                            return "74.0192 85"
                                                                        } else {
                                                                            if (this.charisma >= 5) {
                                                                                return "78.3494 87.5"
                                                                            } else {
                                                                                if (this.charisma >= 4) {
                                                                                    return "82.6795 90"
                                                                                } else {
                                                                                    if (this.charisma >= 3) {
                                                                                        return "87.0096 92.5"
                                                                                    } else {
                                                                                        if (this.charisma >= 2) {
                                                                                            return "91.3397 95"
                                                                                        } else {
                                                                                            if (this.charisma >= 1) {
                                                                                                return "95.6699 97.5"
                                                                                            } else {
                                                                                                return "100 100"
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },







            strengthMod: function () {
                if (this.strength >= 30) {
                    return 10
                } else {
                    if (this.strength >= 28) {
                        return 9
                    } else {
                        if (this.strength >= 26) {
                            return 8
                        } else {
                            if (this.strength >= 24) {
                                return 7
                            } else {
                                if (this.strength >= 22) {
                                    return 6
                                } else {
                                    if (this.strength >= 20) {
                                        return 5
                                    } else {
                                        if (this.strength >= 18) {
                                            return 4
                                        } else {
                                            if (this.strength >= 16) {
                                                return 3
                                            } else {
                                                if (this.strength >= 14) {
                                                    return 2
                                                } else {
                                                    if (this.strength >= 12) {
                                                        return 1
                                                    } else {
                                                        if (this.strength >= 10) {
                                                            return 0
                                                        } else {
                                                            if (this.strength >= 8) {
                                                                return -1
                                                            } else {
                                                                if (this.strength >= 6) {
                                                                    return -2
                                                                } else {
                                                                    if (this.strength >= 4) {
                                                                        return -3
                                                                    } else {
                                                                        if (this.strength >= 2) {
                                                                            return -4
                                                                        } else {
                                                                            return -5
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            dexterityMod: function () {
                if (this.dexterity >= 30) {
                    return 10
                } else {
                    if (this.dexterity >= 28) {
                        return 9
                    } else {
                        if (this.dexterity >= 26) {
                            return 8
                        } else {
                            if (this.dexterity >= 24) {
                                return 7
                            } else {
                                if (this.dexterity >= 22) {
                                    return 6
                                } else {
                                    if (this.dexterity >= 20) {
                                        return 5
                                    } else {
                                        if (this.dexterity >= 18) {
                                            return 4
                                        } else {
                                            if (this.dexterity >= 16) {
                                                return 3
                                            } else {
                                                if (this.dexterity >= 14) {
                                                    return 2
                                                } else {
                                                    if (this.dexterity >= 12) {
                                                        return 1
                                                    } else {
                                                        if (this.dexterity >= 10) {
                                                            return 0
                                                        } else {
                                                            if (this.dexterity >= 8) {
                                                                return -1
                                                            } else {
                                                                if (this.dexterity >= 6) {
                                                                    return -2
                                                                } else {
                                                                    if (this.dexterity >= 4) {
                                                                        return -3
                                                                    } else {
                                                                        if (this.dexterity >= 2) {
                                                                            return -4
                                                                        } else {
                                                                            return -5
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            constitutionMod: function () {
                if (this.constitution >= 30) {
                    return 10
                } else {
                    if (this.constitution >= 28) {
                        return 9
                    } else {
                        if (this.constitution >= 26) {
                            return 8
                        } else {
                            if (this.constitution >= 24) {
                                return 7
                            } else {
                                if (this.constitution >= 22) {
                                    return 6
                                } else {
                                    if (this.constitution >= 20) {
                                        return 5
                                    } else {
                                        if (this.constitution >= 18) {
                                            return 4
                                        } else {
                                            if (this.constitution >= 16) {
                                                return 3
                                            } else {
                                                if (this.constitution >= 14) {
                                                    return 2
                                                } else {
                                                    if (this.constitution >= 12) {
                                                        return 1
                                                    } else {
                                                        if (this.constitution >= 10) {
                                                            return 0
                                                        } else {
                                                            if (this.constitution >= 8) {
                                                                return -1
                                                            } else {
                                                                if (this.constitution >= 6) {
                                                                    return -2
                                                                } else {
                                                                    if (this.constitution >= 4) {
                                                                        return -3
                                                                    } else {
                                                                        if (this.constitution >= 2) {
                                                                            return -4
                                                                        } else {
                                                                            return -5
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            intelligenceMod: function () {
                if (this.intelligence >= 30) {
                    return 10
                } else {
                    if (this.intelligence >= 28) {
                        return 9
                    } else {
                        if (this.intelligence >= 26) {
                            return 8
                        } else {
                            if (this.intelligence >= 24) {
                                return 7
                            } else {
                                if (this.intelligence >= 22) {
                                    return 6
                                } else {
                                    if (this.intelligence >= 20) {
                                        return 5
                                    } else {
                                        if (this.intelligence >= 18) {
                                            return 4
                                        } else {
                                            if (this.intelligence >= 16) {
                                                return 3
                                            } else {
                                                if (this.intelligence >= 14) {
                                                    return 2
                                                } else {
                                                    if (this.intelligence >= 12) {
                                                        return 1
                                                    } else {
                                                        if (this.intelligence >= 10) {
                                                            return 0
                                                        } else {
                                                            if (this.intelligence >= 8) {
                                                                return -1
                                                            } else {
                                                                if (this.intelligence >= 6) {
                                                                    return -2
                                                                } else {
                                                                    if (this.intelligence >= 4) {
                                                                        return -3
                                                                    } else {
                                                                        if (this.intelligence >= 2) {
                                                                            return -4
                                                                        } else {
                                                                            return -5
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            wisdomMod: function () {
                if (this.wisdom >= 30) {
                    return 10
                } else {
                    if (this.wisdom >= 28) {
                        return 9
                    } else {
                        if (this.wisdom >= 26) {
                            return 8
                        } else {
                            if (this.wisdom >= 24) {
                                return 7
                            } else {
                                if (this.wisdom >= 22) {
                                    return 6
                                } else {
                                    if (this.wisdom >= 20) {
                                        return 5
                                    } else {
                                        if (this.wisdom >= 18) {
                                            return 4
                                        } else {
                                            if (this.wisdom >= 16) {
                                                return 3
                                            } else {
                                                if (this.wisdom >= 14) {
                                                    return 2
                                                } else {
                                                    if (this.wisdom >= 12) {
                                                        return 1
                                                    } else {
                                                        if (this.wisdom >= 10) {
                                                            return 0
                                                        } else {
                                                            if (this.wisdom >= 8) {
                                                                return -1
                                                            } else {
                                                                if (this.wisdom >= 6) {
                                                                    return -2
                                                                } else {
                                                                    if (this.wisdom >= 4) {
                                                                        return -3
                                                                    } else {
                                                                        if (this.wisdom >= 2) {
                                                                            return -4
                                                                        } else {
                                                                            return -5
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            charismaMod: function () {
                if (this.charisma >= 30) {
                    return 10
                } else {
                    if (this.charisma >= 28) {
                        return 9
                    } else {
                        if (this.charisma >= 26) {
                            return 8
                        } else {
                            if (this.charisma >= 24) {
                                return 7
                            } else {
                                if (this.charisma >= 22) {
                                    return 6
                                } else {
                                    if (this.charisma >= 20) {
                                        return 5
                                    } else {
                                        if (this.charisma >= 18) {
                                            return 4
                                        } else {
                                            if (this.charisma >= 16) {
                                                return 3
                                            } else {
                                                if (this.charisma >= 14) {
                                                    return 2
                                                } else {
                                                    if (this.charisma >= 12) {
                                                        return 1
                                                    } else {
                                                        if (this.charisma >= 10) {
                                                            return 0
                                                        } else {
                                                            if (this.charisma >= 8) {
                                                                return -1
                                                            } else {
                                                                if (this.charisma >= 6) {
                                                                    return -2
                                                                } else {
                                                                    if (this.charisma >= 4) {
                                                                        return -3
                                                                    } else {
                                                                        if (this.charisma >= 2) {
                                                                            return -4
                                                                        } else {
                                                                            return -5
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },




        }
    })

}
