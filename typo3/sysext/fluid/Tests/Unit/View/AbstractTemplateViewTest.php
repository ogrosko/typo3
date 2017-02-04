<?php
namespace TYPO3\CMS\Fluid\Tests\Unit\View;

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
use TYPO3\CMS\Fluid\Core\Rendering\RenderingContext;
use TYPO3\CMS\Fluid\View\AbstractTemplateView;
use TYPO3\Components\TestingFramework\Core\AccessibleObjectInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\ViewHelperVariableContainer;

/**
 * Test case
 */
class AbstractTemplateViewTest extends \TYPO3\Components\TestingFramework\Core\Unit\UnitTestCase
{
    /**
     * @var AbstractTemplateView|AccessibleObjectInterface
     */
    protected $view;

    /**
     * @var RenderingContext|\PHPUnit_Framework_MockObject_MockObject
     */
    protected $renderingContext;

    /**
     * @var ViewHelperVariableContainer|\PHPUnit_Framework_MockObject_MockObject
     */
    protected $viewHelperVariableContainer;

    /**
     * Sets up this test case
     *
     * @return void
     */
    protected function setUp()
    {
        $this->viewHelperVariableContainer = $this->getMockBuilder(ViewHelperVariableContainer::class)
            ->setMethods(['setView'])
            ->getMock();
        $this->renderingContext = $this->getMockBuilder(\TYPO3\CMS\Fluid\Tests\Unit\Core\Rendering\RenderingContextFixture::class)
            ->setMethods(['getViewHelperVariableContainer'])
            ->getMock();
        $this->renderingContext->expects($this->any())->method('getViewHelperVariableContainer')->will($this->returnValue($this->viewHelperVariableContainer));
        $this->view = $this->getAccessibleMock(AbstractTemplateView::class, ['dummy'], [], '', false);
        $this->view->setRenderingContext($this->renderingContext);
    }

    /**
     * @test
     */
    public function viewIsPlacedInViewHelperVariableContainer()
    {
        $this->viewHelperVariableContainer->expects($this->once())->method('setView')->with($this->view);
        $this->view->setRenderingContext($this->renderingContext);
    }
}
