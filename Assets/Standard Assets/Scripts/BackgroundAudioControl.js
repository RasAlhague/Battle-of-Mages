#pragma strict

var SoundTrigger : boolean = false;
var ShowAudioPlayer : boolean = false;

var AudioClips : AudioClip[];

var AudioClipsCurrentIndex : int = 0;

var AudioPlayerAreaRect : Rect;
var AudioPlayerAreaRectLeft : float;
var AudioPlayerAreaRectTop : float;
var AudioPlayerAreaRectWidth : float;
var AudioPlayerAreaRectHeight : float;

var PlaybackStartTime : float;
var hSliderSoundVolumeValue : float;

function Awake () {

	DontDestroyOnLoad(this);
	
	hSliderSoundVolumeValue = 1.0;
	AudioPlayerAreaRectWidth = 200;
	AudioPlayerAreaRectLeft = Screen.width-AudioPlayerAreaRectWidth;
	AudioPlayerAreaRectHeight = 100;
	AudioPlayerAreaRectTop = 0;
	AudioPlayerAreaRect = Rect(AudioPlayerAreaRectLeft, AudioPlayerAreaRectTop, AudioPlayerAreaRectWidth, AudioPlayerAreaRectHeight);
}

function OnGUI() {

	GUILayout.BeginArea(AudioPlayerAreaRect);
	
	GUILayout.BeginVertical();
	
	if(ShowAudioPlayer) {
	
		if(GUILayout.Button("^",  GUILayout.Height(10))) {
		
			ShowAudioPlayer = !ShowAudioPlayer;
		}
	}
	else {
	
		if(GUILayout.Button("v",  GUILayout.Height(10))) {
		
			ShowAudioPlayer = !ShowAudioPlayer;
		}
	}
	
	//обработка стоп/плей
	if(audio.isPlaying && !SoundTrigger) {
	
		audio.Pause();
	}
	else if(!audio.isPlaying && SoundTrigger) {
		
		if( !audio.clip ) {
		
			audio.clip = AudioClips[ AudioClipsCurrentIndex ];
		}
		AudioPlayAndSetTime();
	}
	
	if(Time.time >= PlaybackStartTime + AudioClips[ AudioClipsCurrentIndex ].length ) {
	
		NextAudioClip();
	}
	
	//обработка слайдера
	audio.volume = hSliderSoundVolumeValue;
	
	if(ShowAudioPlayer) {
		
		//Audio control
		GUILayout.BeginHorizontal();
		
		GUILayout.Label( (AudioClipsCurrentIndex+1).ToString() + "/" + AudioClips.Length.ToString());
		GUILayout.Label(AudioClips[ AudioClipsCurrentIndex ].name);
		
		GUILayout.EndHorizontal();
		
		
		GUILayout.BeginHorizontal();
		
		SoundTrigger = GUILayout.Toggle(SoundTrigger, Localization.Language["Sound"].ToString());
		hSliderSoundVolumeValue =  GUILayout.HorizontalSlider( hSliderSoundVolumeValue, 0.0, 1.0,  GUILayout.Width(60) );
		
		if( GUILayout.Button("<") ) {
		
			PreviewAudioClip();
		}
		
		if( GUILayout.Button(">") ) {
		
			NextAudioClip();
		}
		
		GUILayout.EndHorizontal();
	}
		
	GUILayout.EndVertical();
	GUILayout.EndArea();
}

function AudioPlayAndSetTime() {

	audio.Play();
	PlaybackStartTime = Time.time;
}

function SetPlaybackStartTime() {

	PlaybackStartTime = Time.time;
}

function AudioClipsCurrentIndexInc() {

	if(AudioClipsCurrentIndex+1 < AudioClips.Length) {
	
		AudioClipsCurrentIndex++;
	}
	else {
	
		AudioClipsCurrentIndex = 0;
	}
	return AudioClipsCurrentIndex;
}

function AudioClipsCurrentIndexDec() {

	if(AudioClipsCurrentIndex-1 >= 0) {
	
		AudioClipsCurrentIndex--;
	}
	else {
	
		AudioClipsCurrentIndex = AudioClips.Length-1;
	}
	return AudioClipsCurrentIndex;
}

function PreviewAudioClip() {

	audio.clip = AudioClips[ AudioClipsCurrentIndexDec() ];
	AudioPlayAndSetTime();
}

function NextAudioClip() {

	audio.clip = AudioClips[ AudioClipsCurrentIndexInc() ];
	AudioPlayAndSetTime();
}
