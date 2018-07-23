<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Newsletter
 * @copyright   Copyright (c) 2010 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Newsletter subscribe controller
 *
 * @category    Mage
 * @package     Mage_Newsletter
 * @author      Magento Core Team <core@magentocommerce.com>
 */

require_once Mage::getModuleDir('controllers', 'Mage_Newsletter').DS.'SubscriberController.php';
class VJP_Newsletterpopup_Frontend_Newsletter_SubscriberController extends Mage_Newsletter_SubscriberController
{
    /**
     * Pop-up Subscription action
     */
   	
    public function newajaxAction()
    {
        $this->newAction();
	/*
	$subscriber = Mage::getModel('newsletter/subscriber')->loadByEmail($this->getRequest()->getPost('email'));
	$firstname = (string) $this->getRequest()->getPost('firstname');
	$lastname = (string) $this->getRequest()->getPost('lastname');
	$subscriber->setFirstname($firstname);              
	$subscriber->setLastname($lastname);              
        $subscriber->save();
	*/
        $session = Mage::getSingleton('core/session');
        $messages = $session->getMessages(true);
        $errors = $messages->getErrors();
        $response = array(
            'errorMsg' => '',
            'successMsg' => ''
        );

        if ($errors) {
            $response['errorMsg'] = $errors[0]->getText();
        } else {
            $success = $messages->getItemsByType('success');
            $response['successMsg'] = $success[0]->getText();
        }

        echo Mage::helper('core')->jsonEncode($response);
        exit;
    }
}
