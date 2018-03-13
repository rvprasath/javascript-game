package com.balloonpop.service;

import java.util.List;

import com.balloonpop.dto.PlayerScoreDto;

/**
 * @author vishnu
 *
 */
public abstract interface PlayerScoreService {

	/**
	 * get player score
	 * 
	 * @param paramString1
	 * @param paramString2
	 * @param paramString3
	 * @param paramInt
	 * @param paramDouble
	 * @return List<PlayerScoreDto>
	 */
	public abstract List<PlayerScoreDto> getPlayerScore(String playerName, String playerUrl, String playerCompany,
			int playerScoreVar, Double randomNumber);

	/**
	 * get initial player score
	 * 
	 * @return List<PlayerScoreDto>
	 */
	public abstract List<PlayerScoreDto> getPlayerScoreinitial();
}