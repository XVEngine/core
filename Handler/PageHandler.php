<?php

namespace XVEngine\Core\Handler;
use XVEngine\Core\Component\AbstractComponent;


/**
 * This class is unused - used only in EcikLight project
 *
 * Class PageHandler
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler
 */
class PageHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "page";

    /**
     *
     * @var AbstractComponent 
     */
    public $component = null;

    /**
     * @var string
     */
    protected $slideType;

    
    
    CONST SLIDE_UP = "up";
    CONST SLIDE_DOWN = "down";
    CONST SLIDE_LEFT = "left";
    CONST SLIDE_RIGHT = "right";
    CONST SLIDE_PREVIOUS= "previous";
    CONST SLIDE_NONE = "none";


    /**
     * @param null $id
     */
    public function __construct($id = null) {
        $this->setID($id);
        $this->setAnimationType(self::SLIDE_UP);
    }


    /**
     * Component view to display
     * @author Krzysztof Bednarczyk
     * @param AbstractComponent $component
     * @return $this
     */
    public function setComponent(AbstractComponent $component) {
        $this->component = $component;
        return $this;
    }

    /**
     * @author Krzysztof Bednarczyk
     * @return AbstractComponent
     */
    public function getComponent(){
        return $this->component;
    }


    /**
     * Setting page id
     * @author Krzysztof Bednarczyk
     * @param string $id
     * @return $this
     */
    public function setId($id){
        $this->id = $id;
        return $this;
    }


    /**
     * Get page id
     * @author Krzysztof Bednarczyk
     * @return null|string
     */
    public function getId(){
        return $this->id;
    }


    /**
     * Set animation to show page and remove previous
     * @author Krzysztof Bednarczyk
     * @param $slideType
     * @return $this
     */
    public function setAnimationType($slideType){
        $this->slideType = $slideType;
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            "component" => $this->component,
            'slideType' => $this->slideType,
            "id" => $this->getID()
        );
    }

}
