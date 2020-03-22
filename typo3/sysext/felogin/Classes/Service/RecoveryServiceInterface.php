<?php
declare(strict_types=1);

namespace TYPO3\CMS\FrontendLogin\Service;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Extbase\Configuration\Exception\InvalidConfigurationTypeException;

interface RecoveryServiceInterface
{
    /**
     * Sends an email with an absolute link including a forgot hash to the passed email address
     * with instructions to recover the account.
     *
     * @param string $emailAddress Receiver's email address.
     *
     * @throws InvalidConfigurationTypeException
     */
    public function sendRecoveryEmail(string $emailAddress): void;
}