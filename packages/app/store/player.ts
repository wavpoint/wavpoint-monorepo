import { atom } from "jotai";
import type { MutableRefObject } from "react";
import { atomWithListeners } from "./utils";

export type CurrentSong = {
	cover: string;
	url: string;
	artist: string;
	title: string;
	duration: number;
};

export const currentSongAtom = atom<CurrentSong | null>(null);
export const [isPlayingAtom, useIsPlayingListener] = atomWithListeners(false);
export const currentSongElapsedTimeAtom = atom<number>(0);
export const audioRefAtom =
	atom<MutableRefObject<HTMLAudioElement | null> | null>(null);
export const [overrideCurrentlyPlaying, useOverrideCurrentlyPlayingListener] =
	atomWithListeners<boolean>(false);
