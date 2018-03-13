package com.balloonpop.service.impl;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import com.balloonpop.domain.PlayerScore;
import com.balloonpop.dto.PlayerScoreDto;
import com.balloonpop.repository.PlayerScoreRepository;
import com.balloonpop.service.PlayerScoreService;

/**
 * @author vishnu
 *
 */
@Service
public class PlayerScoreServiceImpl implements PlayerScoreService {

	@Resource
	PlayerScoreRepository playerScoreRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.balloonpop.service.PlayerScoreService#getPlayerScore(java.lang.
	 * String, java.lang.String, java.lang.String, int, java.lang.Double)
	 */
	@Override
	public List<PlayerScoreDto> getPlayerScore(String playerName, String playerUrl, String playerCompany,
			int playerScoreVar, Double randomNumber) {
		PlayerScore playerScore = new PlayerScore();
		String randomNumberCheck = "";
		int scoreUpdatereference = -1;
		ArrayList<PlayerScoreDto> playerScoreDtos = new ArrayList<PlayerScoreDto>();
		List<PlayerScore> playerScores = playerScoreRepository.findAll();
		playerScore.setCompanyName(playerCompany);
		playerScore.setPlayerName(playerName);
		playerScore.setProfileLink(playerUrl);
		playerScore.setScore(playerScoreVar);
		playerScore.setRandomNumber(randomNumber);
		for (PlayerScore playerScoreRandomNumber : playerScores) {
			++scoreUpdatereference;
			double randomNumberchkVar = playerScoreRandomNumber.getRandomNumber();
			if (randomNumberchkVar != randomNumber)
				continue;
			randomNumberCheck = "yes";
			playerScores.set(scoreUpdatereference, playerScore);
		}
		if (!randomNumberCheck.equalsIgnoreCase("yes")) {
			playerScores.add(playerScore);
		}
		if (playerScores.size() <= 11) {
			Collections.sort(playerScores, new Comparator<PlayerScore>() {

				@Override
				public int compare(PlayerScore s1, PlayerScore s2) {
					return Integer.valueOf(s1.getScore()).compareTo(s2.getScore());
				}
			});
			Collections.reverse(playerScores);
			if (playerScores.size() <= 11) {
				int totalNumberOfScore = 1;
				for (PlayerScore playerScore12 : playerScores) {
					playerScore12.setId(totalNumberOfScore);
					if (totalNumberOfScore <= 10) {
						playerScores.set(totalNumberOfScore - 1, playerScore12);
					} else if (playerScores.get(totalNumberOfScore - 1) != null) {
						playerScores.remove(totalNumberOfScore - 1);
						break;
					}
					++totalNumberOfScore;
				}
				playerScoreRepository.saveAll(playerScores);
			}
			List<PlayerScore> playerScores3 = playerScoreRepository.findAll();
			for (PlayerScore playerScore2 : playerScores3) {
				PlayerScoreDto playerScoreDto = new PlayerScoreDto();
				try {
					BeanUtils.copyProperties((Object) playerScoreDto, (Object) playerScore2);
				} catch (IllegalAccessException | InvocationTargetException e) {
					e.printStackTrace();
				}
				playerScoreDtos.add(playerScoreDto);
			}
		} else {
			for (PlayerScore playerScore2 : playerScores) {
				PlayerScoreDto playerScoreDto = new PlayerScoreDto();
				try {
					BeanUtils.copyProperties((Object) playerScoreDto, (Object) playerScore2);
				} catch (IllegalAccessException | InvocationTargetException e) {
					e.printStackTrace();
				}
				playerScoreDtos.add(playerScoreDto);
			}
			return playerScoreDtos;
		}
		return playerScoreDtos;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.balloonpop.service.PlayerScoreService#getPlayerScoreinitial()
	 */
	@Override
	public List<PlayerScoreDto> getPlayerScoreinitial() {
		ArrayList<PlayerScoreDto> playerScoreDtos = new ArrayList<PlayerScoreDto>();
		List<PlayerScore> playerScores3 = playerScoreRepository.findAll();
		for (PlayerScore playerScore2 : playerScores3) {
			PlayerScoreDto playerScoreDto = new PlayerScoreDto();
			try {
				BeanUtils.copyProperties((Object) playerScoreDto, (Object) playerScore2);
			} catch (IllegalAccessException | InvocationTargetException e) {
				e.printStackTrace();
			}
			playerScoreDtos.add(playerScoreDto);
		}
		return playerScoreDtos;
	}

}