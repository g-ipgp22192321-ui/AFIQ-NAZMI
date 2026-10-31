import React from 'react';
import detectiveMapImg from './detective_adventure_map_1793468878180.jpg';
import libraryImg from './library_mystery_case_1793468894257.jpg';
import scienceLabImg from './science_lab_mystery_1793468907517.jpg';
import clockTowerImg from './clock_tower_portal_1793468920872.jpg';
import goldenBadgeImg from './golden_master_badge_1793468939272.jpg';

export const resolveAsset = (fileName: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}images/${fileName}`;
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackPath?: string
) => {
  const target = e.currentTarget;
  if (!target) return;
  const retryCount = Number(target.dataset.retryCount || '0');
  if (retryCount >= 4) return;
  target.dataset.retryCount = String(retryCount + 1);

  if (fallbackPath && target.src !== fallbackPath) {
    target.src = fallbackPath;
    return;
  }

  const currentSrc = target.src;
  const fileName = currentSrc.split('/').pop()?.split('?')[0] || '';

  // Smart multi-tier fallback to guaranteed static assets in public/images
  if (fileName.includes('map') || fileName.includes('island') || fileName.includes('Booth')) {
    target.src = '/images/detective_adventure_map.jpg';
  } else if (fileName.includes('library')) {
    target.src = '/images/library_mystery_case.jpg';
  } else if (fileName.includes('lab') || fileName.includes('science')) {
    target.src = '/images/science_lab_mystery.jpg';
  } else if (fileName.includes('clock') || fileName.includes('tower')) {
    target.src = '/images/clock_tower_portal.jpg';
  } else if (fileName.includes('badge') || fileName.includes('master') || fileName.includes('golden')) {
    target.src = '/images/golden_master_badge.jpg';
  } else if (fileName) {
    target.src = `/images/${fileName}`;
  }
};

export const GAME_IMAGES = {
  adventureMap: detectiveMapImg,
  libraryMystery: libraryImg,
  scienceLab: scienceLabImg,
  clockTower: clockTowerImg,
  goldenMasterBadge: goldenBadgeImg,
};

export const GAME_ART = {
  adventureMap: detectiveMapImg,
  libraryMystery: libraryImg,
  scienceLab: scienceLabImg,
  clockTower: clockTowerImg,
  goldenMasterBadge: goldenBadgeImg,
  bundled: {
    adventureMap: detectiveMapImg,
    libraryMystery: libraryImg,
    scienceLab: scienceLabImg,
    clockTower: clockTowerImg,
    goldenMasterBadge: goldenBadgeImg,
  },
};
