package com.balloonpop.controller;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.balloonpop.dto.PlayerScoreDto;
import com.balloonpop.service.PlayerScoreService;

/**
 * @author vishnu
 *
 */
@Controller
public class CommonController {

	@Autowired
	PlayerScoreService playerScoreService;

	/**
	 * constructor
	 */
	public CommonController() {
	}

	/**
	 * game page
	 * 
	 * @return String
	 */
	@RequestMapping(value = "/")
	public String home() {
		return "balloonpop";
	}

	/**
	 * copyright year dynamic value
	 * 
	 * @return String
	 */
	@RequestMapping({ "/copyright" })
	@ResponseBody
	public String copyright() {
		int year = Calendar.getInstance().get(1);
		int nextYear = year + 1;
		String copyRight = "";

		if (year == 2016) {
			copyRight = String.valueOf(nextYear);
		} else {
			copyRight = String.valueOf(year);
		}
		return copyRight;
	}

	/**
	 * return initial score
	 * 
	 * @return List<PlayerScoreDto>
	 */
	@RequestMapping({ "/scoreinitial" })
	@ResponseBody
	public List<PlayerScoreDto> scoreinitial() {
		List<PlayerScoreDto> playerScoreDtos = playerScoreService.getPlayerScoreinitial();
		return playerScoreDtos;
	}

	/**
	 * return score
	 * 
	 * @param playerName
	 * @param playerUrl
	 * @param playerCompany
	 * @param playerScore
	 * @param randomNumber
	 * @return List<PlayerScoreDto>
	 */
	@RequestMapping({ "/score" })
	@ResponseBody
	public List<PlayerScoreDto> score(String playerName, String playerUrl, String playerCompany, int playerScore,
			Double randomNumber) {
		List<PlayerScoreDto> playerScoreDtos = playerScoreService.getPlayerScore(playerName, playerUrl, playerCompany,
				playerScore, randomNumber);
		return playerScoreDtos;
	}
}
