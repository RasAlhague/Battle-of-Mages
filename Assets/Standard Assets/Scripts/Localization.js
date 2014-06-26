class Localization {

	static var inGameLanguage : int = 0;
	
	static var Language = new Hashtable();
	
	static function InitLang(q) {
	
		inGameLanguage = q;
	
		switch(q) {
		
			case 0:
				
				Language = { "Start Server" : "Start Server", 
							"Connect as client" : "Connect as client", 
							"Exit" : "Exit",
							"You Player Name: " : "You Player Name : ",
							"Skills" : "Skills",
							"Items" : "Items",
							"Connection status: Server!" : "Connection status: Server!",
							"Server IP: " : "Server IP: ",
							"Connection status: Connecting" : "Connection status: Connecting",
							"Connection status: Client!" : "Connection status: Client!",
							"Ping to server: " : "Ping to server: ",
							"Connect" : "Connect",
							"Main Menu" : "Main Menu",
							"Server" : "Server",
							"Clients" : "Clients",
							"Connections: " : "Connections: ",
							"Start Game" : "Start Game",
							"Stats" : "Stats", 
							"Skills Page":"Skills Page",
							"Setting":"Setting",
							"Client IP":"Client IP",
							"Team":"Team",
							"Name":"Name",
							"Team name":"Team name",
							"Add team":"Add team",
							"Add":"Add",
							"Shop":"Shop",
							"Chose Hot Key Button":"Chose Hot Key Button",
							"Chat":"Chat",
							"Spell Initial Price":"Spell Initial Price",
							"Spell Next Level Price":"Spell Next Level Price",
							"Spell Damage":"Spell Damage",
							"Spell Cooldown":"Spell Cooldown",
							
							/*
									Setting
							*/
							"Current QualityLevel: ":"Current QualityLevel: ",
							"Fastest":"Fastest",
							"Fast":"Fast",
							"Simple":"Simple",
							"Good":"Good",
							"Beautiful":"Beautiful",
							"Fantastic":"Fantastic",
							
							"Run in Background: ":"Run in Background: ",
							
							"Language":"Language",
							
							/*
									Summon
							*/
							"Summon":"Summon",
							"Summon can move by LMB":"Summon can move by LMB",
							
							/*
									SelfDirectedBolt
							*/
							
							"Self-directed bolt":"Self-directed bolt",
							"Self-directed bolt2":"Self-directed bolt2",
							"Sound":"Sound",
							
							/*
									FireBall
							*/
							"Fire Ball":"Fire Ball",
							"FireBall description":"Standatr offensive spell.",
							
							/*
									Teleport
							*/
							"Teleport":"Teleport",
							"Teleport description":"Moves you through time and space",
							
							/*
									Protective Wall
							*/
							"Protective Wall":"Protective Wall"
							
							};		//End of Massive
				
				break;
				
			case 1:
				
				Language = { "Start Server" : "Сервер", 
							"Connect as client" : "Клиент", 
							"Exit" : "Выход",
							"You Player Name: " : "Имя Игрока : ",
							"Skills" : "Заклинания",
							"Items" : "Предметы",
							"Connection status: Server!" : "Статус соединения: Сервер!",
							"Server IP: " : "IP Сервера: ",
							"Connection status: Connecting" : "Статус соединения: Соединение",
							"Connection status: Client!" : "Статус соединения: Клиент!",
							"Ping to server: " : "Пинг к серверу: ",
							"Connect" : "Подключить",
							"Main Menu" : "Главное меню",
							"Server" : "Сервер",
							"Clients" : "Клиент",
							"Connections: " : "Подключения: ",
							"Start Game" : "Начать игру",
							"Stats" : "Статистика" , 
							"Skills Page":"Страница умений",
							"Setting":"Настройки",
							"Team":"Команда",
							"Name":"Имя",
							"Team name":"Имя команды",
							"Add team":"Добавить команду",
							"Add":"Добавить",
							"Shop":"Магазин",
							"Chose Hot Key Button":"Выберите горячую клавишу",
							"Chat":"Чат",
							"Spell Initial Price":"Стартовая цена заклинания",
							"Spell Next Level Price":"Цена покупки следующего уровня",
							"Spell Damage":"Урон",
							"Spell Cooldown":"Кулдаун",
							
							/*
									Setting
							*/
							"Current QualityLevel: ":"Текущий уровень качества: ",
							"Fastest":"Максимум скорости",
							"Fast":"Бистрий",
							"Simple":"Простой",
							"Good":"Хороший",
							"Beautiful":"Прекрасний",
							"Fantastic":"Фантастический",
							
							"Run in Background: ":"Работать в фоновом режиме: ",
							
							"Language":"Язык интерфейса",
							
							/*
									Summon
							*/
							"Summon":"Сумон",
							"Summon can move by LMB":"Сумон может передвегаться посредством ЛКМ",
							
							/*
									SelfDirectedBolt
							*/
							
							"Self-directed bolt":"Само-наводящийся заряд",
							"Self-directed bolt2":"Само-наводящийся заряд",
							"Sound":"Музыка",
							
							/*
									FireBall
							*/
							"Fire Ball":"Огненый шар",
							"Fire Ball \n Standart skill":"Огненый шар \n Стандартный атакующий скил",
							
							/*
									Teleport
							*/
							"Teleport":"Перемещение",
							"Teleport \n Moves you through time and space":"Перемещение \n Перемеает сквозь время и пространство",
							
							/*
									Protective Wall
							*/
							"Protective Wall":"Защитная стена"
							
							};		//End of Massive
				
				break;
				
			case 2:
				
				Language = { "Start Server" : "Сервер", 
							"Connect as client" : "Клієнт", 
							"Exit" : "Вихід" ,
							"You Player Name: " : "Ім'я Ігрока : ",
							"Skills" : "Закляття",
							"Items" : "Предмети",
							"Connection status: Server!" : "Статус з'єднання: Сервер!",
							"Server IP: " : "Server IP: ",
							"Connection status: Connecting" : "Статус з'єднання: З'єднання",
							"Connection status: Client!" : "Статус з'єднання: Кліент!",
							"Ping to server: " : "Пінг до серверу: ",
							"Connect" : "З'єднати",
							"Main Menu" : "Головне меню",
							"Server" : "Сервер",
							"Clients" : "Клієнт",
							"Connections: " : "Підключень: ",
							"Start Game" : "Почати гру",
							"Stats" : "Статистика" , 
							"Skills Page":"Сторінка вмінь",
							"Setting":"Налаштування",
							"Team":"Team",
							"Name":"Name",
							"Team name":"Ім`я каманди",
							"Add team":"Додати команду",
							"Add":"Додати",
							"Shop":"Магазин",
							"Chose Hot Key Button":"Виберіть гарячу клавішу",
							"Chat":"Чат",
							"Spell Initial Price":"Початкова ціна",
							"Spell Next Level Price":"Ціна за наступній рівень",
							"Spell Damage":"Шкода",
							"Spell Cooldown":"Кулдаун",
							
							/*
									Setting
							*/
							"Current QualityLevel: ":"Поточний рівень якості: ",
							"Fastest":"Найшвидший",
							"Fast":"Швидкий",
							"Simple":"Простий",
							"Good":"Гарний",
							"Beautiful":"Чудовий",
							"Fantastic":"Фантастичний",
							
							"Run in Background: ":"Працювати при згортанні: ",
							
							"Language":"Мова інтерфейсу",
							
							
							/*
									Summon
							*/
							"Summon":"Сумон",
							"Summon can move by LMB":"Сумон може рухатися за допомогою ЛКМ",
							
							/*
									SelfDirectedBolt
							*/
							
							"Self-directed bolt":"Самонавідний заряд",
							"Self-directed bolt2":"Самонавідний заряд",
							"Sound":"Музика",
							
							/*
									FireBall
							*/
							"Fire Ball":"Вогнений шар",
							"Fire Ball \n Standart skill":"Вогнений шар \n Стандартний фтакуюче закляття",
							
							/*
									Teleport
							*/
							"Teleport":"Переміщення",
							"Teleport \n Moves you through time and space":"Переміщення \n Переміщає скрізь час та простір",
							
							/*
									Protective Wall
							*/
							"Protective Wall":"Захисна стіна"
							
							};		//End of Massive
				
				break;
		}
	}
	
	function GetLocalization() {
	
		return inGameLanguage;
	}
}

